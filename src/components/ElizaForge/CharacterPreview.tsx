import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Character } from '../../types/eliza';
import { useDropzone } from '../../hooks/useDropzone';
import { EditableField } from './EditableField';
import { EditableArray } from './EditableArray';
import { EditableMessageExamples } from './EditableMessageExamples';

interface CharacterPreviewProps {
  data: Character | null;
  onChange?: (data: Character) => void;
}

export const CharacterPreview: React.FC<CharacterPreviewProps> = ({ 
  data,
  onChange 
}) => {
  const { isDragActive, dragRef, openFileDialog } = useDropzone((files) => {
    if (files?.[0]) {
      handleFileUpload(files[0]);
    }
  }, { accept: ['.json'] });

  const handleFileUpload = async (file: File) => {
    try {
      const text = await file.text();
      const character = JSON.parse(text);
      if (onChange) {
        onChange(character);
      }
    } catch (error) {
      console.error('Failed to parse character file:', error);
    }
  };

  const handleChange = useCallback((field: keyof Character, value: any) => {
    if (onChange && data) {
      onChange({
        ...data,
        [field]: value
      });
    }
  }, [data, onChange]);

  const renderValue = (value: any): string => {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };
  if (!data) {
    return (
      <div
        onClick={openFileDialog}
        ref={dragRef}
        className={`flex items-center justify-center h-full border-2 border-dashed transition-colors cursor-pointer ${
          isDragActive
            ? 'border-cyan-400/50 bg-cyan-400/5'
            : 'border-pink-500/30 hover:border-cyan-400/30'
        }`}
      >
        <div className="text-center">
        <p className="text-pink-500/50 font-mono text-[10px] xs:text-xs sm:text-sm text-center px-2 max-w-[150px] xs:max-w-none">
          Start creating your character to see the preview...
        </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={dragRef}
      className={`space-y-2 xs:space-y-3 font-mono text-[10px] xs:text-xs relative cursor-pointer ${
        isDragActive ? 'opacity-50' : ''
      }`}
    >
      {/* Basic Info */}
      <div className="space-y-1 xs:space-y-2">
        <h3 className="text-cyan-400">Basic Information</h3>
        <div className="bg-black/40 p-2 xs:p-3 rounded-lg border border-pink-500/30 space-y-1">
          <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
            <span className="text-cyan-400 text-xs xs:w-16 shrink-0">Name:</span>
            <EditableField
              value={renderValue(data.name)}
              onChange={(value) => handleChange('name', value)}
              className="flex-1"
            />
          </div>
          {data.username && (
            <p className="text-pink-500 text-xs">
              <span className="text-cyan-400">Username:</span> {data.username}
            </p>
          )}
          <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
            <span className="text-cyan-400 text-xs xs:w-16 shrink-0">Provider:</span>
            <EditableField
              value={renderValue(data.modelProvider)}
              onChange={(value) => handleChange('modelProvider', value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Bio & Lore */}
      <div className="space-y-1.5 xs:space-y-2">
        <h3 className="text-cyan-400 text-xs xs:text-sm">Biography & Lore</h3>
        <div className="bg-black/40 p-2 xs:p-3 rounded-lg border border-pink-500/30 space-y-2">
          <EditableArray
            values={Array.isArray(data.bio) ? data.bio : [data.bio || '']}
            onChange={(values) => handleChange('bio', values)}
            label="Biography"
            multiline
          />
          <EditableArray
            values={data.lore || []}
            onChange={(values) => handleChange('lore', values)}
            label="Lore"
            multiline
          />
        </div>
      </div>

      {/* Message Examples */}
      <div className="space-y-1.5 xs:space-y-2">
        <h3 className="text-cyan-400 text-xs xs:text-sm">Message Examples</h3>
        <div className="bg-black/40 p-2 xs:p-3 rounded-lg border border-pink-500/30 overflow-x-hidden">
          <EditableMessageExamples
            examples={data.messageExamples || []}
            onChange={(examples) => handleChange('messageExamples', examples)}
            characterName={data.name}
          />
        </div>
      </div>

      {/* Style */}
      <div className="space-y-1.5 xs:space-y-2">
        <h3 className="text-cyan-400 text-xs xs:text-sm">Style</h3>
        <div className="bg-black/40 p-2 xs:p-3 rounded-lg border border-pink-500/30 space-y-3 xs:space-y-4">
          <EditableArray
            values={data.style?.all || []}
            onChange={(values) => handleChange('style', { ...data.style, all: values })}
            label="All"
          />
          <EditableArray
            values={data.style?.chat || []}
            onChange={(values) => handleChange('style', { ...data.style, chat: values })}
            label="Chat"
          />
          <EditableArray
            values={data.style?.post || []}
            onChange={(values) => handleChange('style', { ...data.style, post: values })}
            label="Post"
          />
        </div>
      </div>

      {/* Topics & Adjectives */}
      <div className="space-y-2">
        <h3 className="text-cyan-400 text-sm">Topics & Traits</h3>
        <div className="bg-black/40 p-3 rounded-lg border border-pink-500/30 space-y-4">
          <EditableArray
            values={data.topics || []}
            onChange={(values) => handleChange('topics', values)}
            label="Topics"
          />
          <EditableArray
            values={data.adjectives || []}
            onChange={(values) => handleChange('adjectives', values)}
            label="Adjectives"
          />
        </div>
      </div>
      {isDragActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg border-2 border-dashed border-cyan-400/50">
          <p className="text-cyan-400 font-mono text-sm">Drop character file here</p>
        </div>
      )}
    </div>
  );
};