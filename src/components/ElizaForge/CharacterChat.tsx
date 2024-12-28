import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Character } from '../../types/eliza';
import { TerminalOutput } from '../Terminal/components/TerminalOutput';
import { TerminalLoading } from '../Terminal/components/TerminalLoading';
import { getRandomItems } from '../../utils/arrays';
import { galadrielAPI } from '../../services/ai/galadriel';

interface CharacterChatProps {
  character: Character | null;
}

export const CharacterChat: React.FC<CharacterChatProps> = ({ character }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatSectionRef = useRef<HTMLDivElement>(null);

  const scrollToChat = useCallback(() => {
    chatSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }, []);

  // Clear messages when character changes
  useEffect(() => {
    setMessages([]);
    setInput('');
    setIsLoading(false);
  }, [character?.name]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = useCallback(async (userMessage: string) => {
    if (!character) return;

    // Ensure we're using Galadriel as the provider
    const enhancedCharacter = {
      ...character,
      modelProvider: 'galadriel',
      model: 'llama3.1:70b'
    };

    // Get random elements from character data
    const styles = getRandomItems([...character.style.all, ...character.style.chat], 3);
    const topics = getRandomItems(character.topics, 2);
    const traits = getRandomItems(character.adjectives, 2);
    const loreItems = getRandomItems(character.lore, 2);
    const bioItems = Array.isArray(character.bio) ? getRandomItems(character.bio, 2) : [character.bio];

    // Build context template
    const systemPrompt = `You are ${character.name}. Respond in character using the following traits and style:

Style Elements:
${styles.map(s => `• ${s}`).join('\n')}

Character Traits:
${traits.map(t => `• ${t}`).join('\n')}

Background:
${bioItems.map(b => `• ${b}`).join('\n')}

Lore:
${loreItems.map(l => `• ${l}`).join('\n')}

Example Interaction:
User: ${character.messageExamples[0][0].content.text}
${character.name}: ${character.messageExamples[0][1].content.text}

IMPORTANT: Always stay in character and respond as ${character.name}. Use the style elements and reference background/lore naturally.`;

    // Get response from Galadriel API
    const response = await galadrielAPI.chat(character.id, userMessage, {
      systemPrompt,
      temperature: 0.8,
      maxTokens: 150
    });

    return response.message;
  }, [character]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !character || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    setIsLoading(true);
    try {
      const response = await generateResponse(userMessage);
      if (response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Error: Unable to process response' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!character) {
    return (
      <div className="w-full bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 p-4 text-center">
        <p className="text-pink-500/50 font-mono text-sm">
          Create or upload a character to start chatting
        </p>
      </div>
    );
  }

  return (
    <div ref={chatSectionRef} className="w-full flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-pink-500/30 bg-black/40">
        <button 
          onClick={scrollToChat}
          className="text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm"
        >
          Chat with {character.name}
        </button>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 min-h-[200px] max-h-[300px] overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg, i) => (
          <div 
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-2 rounded ${
                msg.role === 'user'
                  ? 'bg-pink-500/20 text-pink-500'
                  : 'bg-cyan-500/20 text-cyan-400'
              } font-mono text-sm`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-2 rounded bg-cyan-500/20">
              <TerminalLoading text="Thinking" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form 
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-3 border-t border-pink-500/30 bg-black/40"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Chat with ${character.name}...`}
          className="flex-1 bg-black/40 text-pink-500 placeholder-pink-500/50 px-3 py-2 rounded-lg
                   border border-pink-500/30 outline-none font-mono text-sm
                   focus:border-cyan-400/50 transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2 rounded-lg bg-black/40 border border-pink-500/30 
                   text-pink-500 hover:text-cyan-400 hover:border-cyan-400/50 
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};