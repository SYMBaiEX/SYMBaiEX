import React from 'react';
import { Terminal as TerminalIcon, Power, FileCode } from 'lucide-react';
import { SocialLinks } from '../SocialLinks';
import { UsernameDisplay } from '../Terminal/components/UsernameDisplay';
import { UsernamePopup } from '../Terminal/components/UsernamePopup';
import { userService } from '../../services/user';
import { documents } from '../../assets';

export const Whitepaper: React.FC = () => {
  const [showUsernameInput, setShowUsernameInput] = React.useState(false);
  const [usernameInput, setUsernameInput] = React.useState('');

  return (
    <div className="w-full">
      <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20 h-[600px]">
        {/* Header */}
        <div className="flex items-center gap-1.5 xs:gap-2 p-2 xs:p-3 border-b border-pink-500/30 bg-black/40">
          <TerminalIcon className="w-3 h-3 xs:w-4 xs:h-4 text-pink-500" />
          <span className="text-pink-500 font-mono text-xs xs:text-sm sm:text-base">SYMBaiEX://whitepaper</span>
          <div className="ml-auto flex items-center gap-2">
            <UsernameDisplay onClick={() => setShowUsernameInput(true)} />
            <button
              onClick={() => window.open(documents.whitepaper, '_blank')}
              className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40
                       border border-pink-500/30 hover:border-cyan-400/50 transition-colors"
            >
              <FileCode className="w-3 h-3 xs:w-4 xs:h-4 text-cyan-400" />
              <span className="text-pink-500 font-mono text-[10px] xs:text-xs">View PDF</span>
            </button>
            <Power className="w-3 h-3 xs:w-4 xs:h-4 text-cyan-400" />
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 p-2 xs:p-3 sm:p-4 overflow-hidden relative pdf-container">
          {/* Overlay gradient effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/40 to-transparent" />
          </div>
          
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJzY2FubGluZXMiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjIiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIwIiBzdHJva2U9IiNlYzQ4OTkiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzY2FubGluZXMpIi8+PC9zdmc+')] opacity-50" />
          
          <iframe
            src={`${documents.whitepaper}#view=FitH`}
            className="relative w-full h-full rounded-lg border border-pink-500/30 
                    bg-black/80 backdrop-blur-md shadow-lg shadow-pink-500/20 
                    transition-all duration-300 hover:border-cyan-400/50
                    touch-manipulation"
            title="SYMBaiEX Whitepaper"
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              WebkitTransform: 'translateZ(0)',  // Enable hardware acceleration
              touchAction: 'pan-x pan-y pinch-zoom',  // Enable pinch zoom
              transform: 'translateZ(0)'  // Fallback for non-webkit browsers
            }}
            allow="fullscreen"
          />
        </div>
      </div>
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
      <SocialLinks />
    </div>
  );
};