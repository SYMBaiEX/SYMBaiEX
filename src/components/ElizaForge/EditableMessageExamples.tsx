import React from 'react';
import { Plus, X } from 'lucide-react';
import { EditableField } from './EditableField';
import { MessageExample } from '../../types/eliza';

interface EditableMessageExamplesProps {
  examples: MessageExample[][];
  onChange: (examples: MessageExample[][]) => void;
  characterName?: string;
}

export const EditableMessageExamples: React.FC<EditableMessageExamplesProps> = ({
  examples,
  onChange,
  characterName = 'Character'
}) => {
  const handleAdd = () => {
    const newExample = [
      {
        user: '{{user1}}',
        content: {
          text: 'Enter user message...'
        }
      },
      {
        user: characterName,
        content: {
          text: 'Enter character response...'
        }
      }
    ];
    onChange([newExample, ...examples]);
  };

  const handleRemove = (index: number) => {
    onChange(examples.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, messageIndex: number, value: string) => {
    const newExamples = [...examples];
    // Ensure the exchange exists and has both messages
    if (!newExamples[index]) {
      newExamples[index] = [
        {
          user: '{{user1}}',
          content: { text: '' }
        },
        {
          user: characterName,
          content: { text: '' }
        }
      ];
    }
    
    if (!newExamples[index][messageIndex]) {
      newExamples[index][messageIndex] = {
        user: messageIndex === 0 ? '{{user1}}' : characterName,
        content: { text: '' }
      }
    }

    newExamples[index][messageIndex].content.text = value;
    onChange(newExamples);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-cyan-400 text-xs">Message Examples</h3>
        <button
          onClick={handleAdd}
          className="text-pink-500 hover:text-cyan-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-4">
        {examples?.map((exchange, index) => (
          <div key={index} className="space-y-2 bg-black/20 p-2 rounded">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
              <span className="text-cyan-400 text-xs">Example {index + 1}</span>
              <button
                onClick={() => handleRemove(index)}
                className="text-pink-500 hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {/* User Message */}
              <div className="flex flex-col xs:flex-row xs:items-start gap-1 xs:gap-2">
                <span className="text-pink-500 text-xs xs:w-16 shrink-0">User:</span>
                <div className="flex-1">
                  <EditableField
                    value={exchange[0]?.content?.text || ''}
                    onChange={(value) => handleChange(index, 0, value)}
                    multiline
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Character Response */}
              <div className="flex flex-col xs:flex-row xs:items-start gap-1 xs:gap-2 mt-2">
                <span className="text-cyan-400 text-xs xs:w-16 shrink-0 truncate">{characterName}:</span>
                <div className="flex-1">
                  <EditableField
                    value={exchange[1]?.content?.text || ''}
                    onChange={(value) => handleChange(index, 1, value)}
                    multiline
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};