import React, { useState } from 'react';
import { Terminal as TerminalIcon, Power, Download, FileJson, History } from 'lucide-react';
import { FileUpload } from '../ElizaForge/FileUpload';
import { UsernameDisplay } from '../Terminal/components/UsernameDisplay';
import { UsernamePopup } from '../Terminal/components/UsernamePopup';
import { userService } from '../../services/user';
import { TerminalOutput } from '../Terminal/components/TerminalOutput';
import { TerminalLoading } from '../Terminal/components/TerminalLoading';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useElizaForge } from '../../hooks/useElizaForge';
import { CharacterPreview } from '../ElizaForge/CharacterPreview';
import { useNavigate, useLocation } from 'react-router-dom';
import { SocialLinks } from '../SocialLinks';
import { CharacterChat } from '../ElizaForge/CharacterChat';

export const ElizaForge: React.FC = () => {
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    input,
    setInput,
    output,
    isLoading,
    characterData,
    setCharacterData,
    handleCommand,
    handleKeyDown,
    downloadCharacter
  } = useElizaForge();
  
  // Load character from navigation state if available
  React.useEffect(() => {
    const state = location.state as { character?: Character };
    if (state?.character) {
      setCharacterData(state.character);
      // Clear the state to prevent reloading on subsequent navigations
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, setCharacterData, navigate]);
  
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-4 max-w-full">
        {/* Terminal Section */}
        <div className={`${isMobile ? 'w-full h-[350px] lg:h-[600px]' : 'w-1/2 h-[600px]'} flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20`}>
          {/* Header */}
          <div className="flex items-center gap-1.5 xs:gap-2 p-2 xs:p-3 border-b border-pink-500/30 bg-black/40">
            <TerminalIcon className="w-3 h-3 xs:w-4 xs:h-4 text-pink-500" />
            <span className="text-pink-500 font-mono text-xs xs:text-sm sm:text-base">ElizaForge://terminal</span>
            <div className="ml-auto flex items-center gap-2">
              <UsernameDisplay onClick={() => setShowUsernameInput(true)} />
              <Power className="w-3 h-3 xs:w-4 xs:h-4 text-cyan-400" />
            </div>
          </div>

          {/* Terminal Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <TerminalOutput lines={output}>
              {isLoading && (
                <TerminalLoading 
                  text="Generating character" 
                  subtext="This could take a minute while we craft the perfect personality. We're using AI to generate a unique character with detailed traits, conversation examples, and personality quirks..."
                  rateLimit={{
                    remaining: 5,
                    total: 5,
                    windowMinutes: 20
                  }}
                />
              )}
            </TerminalOutput>
            
            {/* Input Section */}
            <div className="flex items-center gap-3 p-4 border-t border-pink-500/30 bg-black/40">
              <span className="text-cyan-400 font-mono text-base select-none">{'>'}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1 bg-transparent text-pink-500 outline-none font-mono text-[10px] xs:text-xs sm:text-sm placeholder-pink-500/50"
                placeholder="Type 'start' to begin..."
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className={`${isMobile ? 'w-full h-[350px] lg:h-[600px]' : 'w-1/2 h-[600px]'} flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20`}>
          {/* Preview Header */}
          <div className="flex items-center gap-1.5 xs:gap-2 p-2 xs:p-3 border-b border-pink-500/30 bg-black/40">
            <FileJson className="w-3 h-3 xs:w-4 xs:h-4 text-pink-500" />
            <span className="text-pink-500 font-mono text-xs xs:text-sm sm:text-base">Character Preview</span>
            <div className="ml-auto flex items-center gap-1.5 xs:gap-2">
              <FileUpload onUpload={setCharacterData} />
              <button
                onClick={() => navigate('/logs')}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 border border-pink-500/30 
                       hover:border-cyan-400/50 transition-colors group"
              >
                <History className="w-3 h-3 xs:w-4 xs:h-4 text-cyan-400 group-hover:text-cyan-300" />
                <span className="hidden xs:inline text-pink-500 font-mono text-[10px] xs:text-xs group-hover:text-pink-400">Previous</span>
              </button>
              {characterData && (
                <button
                  onClick={downloadCharacter}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 border border-pink-500/30 
                         hover:border-cyan-400/50 transition-colors group"
                >
                  <Download className="w-3 h-3 xs:w-4 xs:h-4 text-cyan-400 group-hover:text-cyan-300" />
                  <span className="hidden xs:inline text-pink-500 font-mono text-[10px] xs:text-xs group-hover:text-pink-400">Download</span>
                </button>
              )}
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <CharacterPreview 
              data={characterData} 
              onChange={setCharacterData}
            />
          </div>
        </div>
      </div>
      
      {/* Chat Section */}
      <div className="mt-4">
        <CharacterChat character={characterData} />
      </div>
      
      <SocialLinks />

      {/* Username Popup */}
      {showUsernameInput && (
        <UsernamePopup
          value={usernameInput}
          onChange={setUsernameInput}
          onSubmit={() => {
            if (usernameInput.trim()) {
              userService.setUsername(usernameInput.trim());
              setShowUsernameInput(false);
              setUsernameInput('');
            }
          }}
          onClose={() => {
            setShowUsernameInput(false);
            setUsernameInput('');
          }}
        />
      )}
    </div>
  );
};