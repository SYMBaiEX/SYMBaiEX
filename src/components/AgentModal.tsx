import React from 'react';
import { X, Brain, User, Zap, Copy, Check, Send, ExternalLink } from 'lucide-react';
import { UsernamePopup } from './Terminal/components/UsernamePopup';
import { Character } from '../types';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useTerminal } from '../hooks/useTerminal';
import { userService } from '../services/user';
import { terminalStore } from '../store/terminalStore';
import { TerminalOutput } from './Terminal/components/TerminalOutput';
import { TerminalLoading } from './Terminal/components/TerminalLoading';

interface AgentModalProps {
  character: Character;
  onClose: () => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ character, onClose }) => {
  const { copied, copyToClipboard } = useCopyToClipboard();
  const [chatInput, setChatInput] = React.useState('');
  const [showUsernameInput, setShowUsernameInput] = React.useState(false);
  const [usernameInput, setUsernameInput] = React.useState('');
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {
    output,
    isLoading,
    handleCommand,
    setInput: setTerminalInput
  } = useTerminal();

  // Set active character when modal opens
  React.useEffect(() => {
    userService.setActiveCharacter(character.id);
    terminalStore.clear();
    terminalStore.updateActiveAgent(character.id);
  }, [character.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setTerminalInput(chatInput);
    handleCommand(chatInput.trim());
    setChatInput('');
  };

  // Auto-scroll chat to bottom
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [output]);

  const getTypeInfo = () => {
    switch (character.id) {
      case 'symbiex':
        return {
          type: 'HUMAN',
          icon: User,
          bgColor: 'bg-black/80',
          textColor: 'text-cyan-400',
          borderColor: 'border-cyan-400'
        };
      case 'symbaiex':
        return {
          type: 'SYMX',
          icon: Zap,
          bgColor: 'bg-gradient-to-r from-cyan-950/80 to-pink-950/80',
          textColor: 'bg-gradient-to-r from-cyan-400 to-pink-400 text-transparent bg-clip-text',
          borderColor: 'border-cyan-400/50 border-r-pink-400/50'
        };
      default:
        return {
          type: 'AI',
          icon: Brain,
          bgColor: 'bg-black/80',
          textColor: 'text-pink-400',
          borderColor: 'border-pink-400'
        };
    }
  };

  const { type, icon: Icon, bgColor, textColor, borderColor } = getTypeInfo();

  const handleSetUsername = () => {
    if (usernameInput.trim()) {
      userService.setUsername(usernameInput.trim());
      terminalStore.clear(); // Refresh terminal output with new username
      setShowUsernameInput(false);
      setUsernameInput('');
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getSolscanUrl = (address: string) => {
    return `https://solscan.io/account/${address}`;
  };

  const getChatCommand = () => `symx chat ${character.id}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl h-[90vh] bg-black/90 border border-pink-500/30 overflow-hidden
                    rounded-lg shadow-lg shadow-pink-500/20 animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-pink-500/30 bg-black/40">
          <div className="flex items-center gap-3">
            <h3 className="text-cyan-400 font-mono text-xl">{character.name}</h3>
            <div className="relative">
              {/* Black background layer */}
              <div className="absolute inset-0 bg-black/90 rounded-full" />
              {/* Gradient layer */}
              <div className={`relative flex items-center gap-1.5 px-2 py-1 rounded-full 
                           ${bgColor} border ${borderColor}`}>
                <Icon className={character.id === 'symbaiex' ? 'w-3 h-3 text-cyan-400' : `w-3 h-3 ${textColor}`} />
                <span className={`font-mono text-xs font-semibold ${textColor}`}>
                  {type}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowUsernameInput(true)}
              className="px-2 py-1 rounded text-pink-500 text-[10px] xs:text-xs sm:text-sm
                       hover:text-cyan-400 transition-colors font-mono text-sm flex-col xs:flex-row"
            >
              <span className="truncate max-w-[80px] xs:max-w-[120px] sm:max-w-none">
                <span className="block xs:hidden">User:</span>
                <span className="hidden xs:inline">User: </span>
                {userService.getUsername() || 'Set Username'}
              </span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Left Column - Bio and Info */}
            <div className="p-2 lg:p-3 space-y-2 lg:space-y-3 overflow-y-auto">
              <div className="relative rounded-lg border border-pink-500/30 overflow-hidden bg-black/40 aspect-[16/9] lg:aspect-[4/3]">
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-pink-500 font-mono text-[10px] xs:text-xs lg:text-base">{character.title}</span>
                  <span className="px-1.5 py-0.5 bg-pink-500/20 rounded-full text-pink-500 text-[10px] lg:text-sm font-mono">
                    {character.status}
                  </span>
                </div>
                
                <div className="space-y-1.5 lg:space-y-2 text-[10px] xs:text-xs lg:text-sm font-mono">
                  <p className="text-cyan-400">Role: {character.role}</p>
                  <p className="text-cyan-400">Clearance: {character.clearance}</p>
                  {character.lastSeen && (
                    <p className="text-cyan-400">Last Seen: {character.lastSeen}</p>
                  )}
                  {character.wallet && (
                    <div className="flex flex-col gap-1 text-[10px] xs:text-xs lg:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400">Wallet:</span>
                        <div className="flex items-center gap-2">
                          <a
                            href={getSolscanUrl(character.wallet)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-500 hover:text-pink-400 transition-colors flex items-center gap-1.5"
                          >
                            <span className="text-[10px] lg:text-sm">{shortenAddress(character.wallet)}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <button
                            onClick={() => copyToClipboard(character.wallet!)}
                            className="text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            {copied ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 mt-3">
                  <a
                    href={character.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full xs:w-auto inline-flex items-center gap-1.5 px-2 py-1 lg:px-3 lg:py-1.5 bg-pink-500/20 rounded-lg 
                             text-pink-500 hover:bg-pink-500/30 transition-colors font-mono text-sm"
                  >
                    <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
                    View Profile
                  </a>

                  <button
                    onClick={() => copyToClipboard(getChatCommand())}
                    className="w-full xs:w-auto inline-flex items-center gap-1.5 px-2 py-1 lg:px-3 lg:py-1.5 bg-black/40 rounded-lg 
                             border border-pink-500/30 hover:border-cyan-400/50 transition-colors"
                  >
                    <span className="text-pink-500 font-mono text-[10px] lg:text-sm">
                      {getChatCommand()}
                    </span>
                    {copied ? (
                      <Check className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3 lg:w-4 lg:h-4 text-cyan-400" />
                    )}
                  </button>
                </div>
                
                {/* Bio Section */}
                <div className="mt-4 font-mono text-[10px] xs:text-xs lg:text-sm text-gray-300 leading-tight lg:leading-relaxed 
                             whitespace-pre-line bg-black/40 p-2 lg:p-3 rounded-lg border border-pink-500/30">
                  {character.bio}
                </div>
              </div>
            </div>
            
            {/* Right Column - Chat */}
            <div className="flex flex-col h-full border-t lg:border-t-0 lg:border-l border-pink-500/30 overflow-hidden mt-0">
              {/* Chat Section */}
              <div className="flex flex-col flex-1 overflow-hidden">
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-2 lg:p-3">
                  <TerminalOutput lines={output}>
                    {isLoading && <TerminalLoading />}
                  </TerminalOutput>
                </div>
                
                {/* Chat Input */}
                <form onSubmit={handleSubmit} className="flex-shrink-0 p-2 lg:p-3 border-t border-pink-500/30 bg-black/40">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={`Chat with ${character.name}...`}
                      className="flex-1 bg-black/40 text-pink-500 placeholder-pink-500/50 px-2 py-1.5 lg:px-3 lg:py-2 rounded-lg 
                               border border-pink-500/30 outline-none font-mono text-xs sm:text-sm
                               focus:border-cyan-400/50 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="p-2 rounded-lg bg-black/40 border border-pink-500/30 
                               text-pink-500 hover:text-cyan-400 hover:border-cyan-400/50 
                               transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Username Popup */}
      {showUsernameInput && (
        <UsernamePopup
          value={usernameInput}
          onChange={setUsernameInput}
          onSubmit={() => {
            if (usernameInput.trim()) {
              userService.setUsername(usernameInput.trim());
              terminalStore.clear(); // Refresh terminal output with new username
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