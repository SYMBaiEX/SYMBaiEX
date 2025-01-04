import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Character } from '../../types/eliza';

interface FileUploadProps {
  onUpload: (character: Character) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const character = JSON.parse(text);

      // Preserve all existing fields from the uploaded character
      const baseCharacter = {
        ...character,
        // Only set defaults for missing required fields
        modelProvider: character.modelProvider || 'ollama',
        clients: character.clients || [],
        plugins: character.plugins || [],
        settings: {
          ...character.settings,
          secrets: character.settings?.secrets || {},
          voice: {
            ...character.settings?.voice,
            model: character.settings?.voice?.model || 'en_US-hfc_female-medium'
          }
        }
      };

      // Ensure arrays exist
      baseCharacter.bio = Array.isArray(character.bio) ? character.bio : [character.bio || ''];
      baseCharacter.lore = character.lore || [];
      baseCharacter.messageExamples = character.messageExamples || [];
      baseCharacter.postExamples = character.postExamples || [];
      baseCharacter.topics = character.topics || [];
      baseCharacter.style = {
        ...character.style,
        all: character.style?.all || [],
        chat: character.style?.chat || [],
        post: character.style?.post || []
      };
      baseCharacter.adjectives = character.adjectives || [];

      // Preserve any additional fields that may exist
      Object.keys(character).forEach(key => {
        if (!(key in baseCharacter)) {
          baseCharacter[key] = character[key];
        }
      });

      onUpload(baseCharacter as Character);
    } catch (error) {
      console.error('Failed to parse character file:', error);
      alert('Invalid character file format. Please check the file and try again.');
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 border border-pink-500/30 
                 hover:border-cyan-400/50 transition-colors group"
      >
        <Upload className="w-3 h-3 xs:w-4 xs:h-4 text-cyan-400 group-hover:text-cyan-300" />
        <span className="hidden xs:inline text-pink-500 font-mono text-[10px] xs:text-xs group-hover:text-pink-400">
          Upload
        </span>
      </button>
    </div>
  );
};