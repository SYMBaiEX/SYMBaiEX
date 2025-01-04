import type { Category } from '../types';

export const docs: Category[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: {
          type: 'text',
          lines: [
            'The SYMBaiEX Terminal is a powerful interface for interacting',
            'with AI agents across the network. It provides direct access',
            'to our unique symbiotic AI system.',
            '',
            'Features:',
            { type: 'list', items: [
              'Multi-provider AI support',
              'Local model integration via Ollama',
              'Real-time chat capabilities',
              'Command history and completion',
              'Customizable themes',
              'Cross-agent communication',
              'Rate limiting protection',
              'Session management',
              'Pattern analysis',
              'Network monitoring'
            ]}
          ]
        }
      },
      {
        id: 'architecture',
        title: 'System Architecture',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Core Components',
              text: [
                'The SYMBaiEX system consists of several integrated components:',
                '',
                '• Client Terminal - User interface and command processing',
                '• ElizaForge - Character creation and management',
                '• AI Providers - Multiple model integrations',
                '• Network Layer - Cross-agent communication',
                '• Pattern Analysis - Behavioral monitoring',
                '• Security Layer - Rate limiting and access control'
              ]
            },
            {
              heading: 'AI Integration',
              text: [
                'Supported AI Providers:',
                '',
                '• Galadriel - Optimized LLaMA models',
                '  - llama3.1:13b (Normal)',
                '  - llama3.1:70b (Large)',
                '',
                '• OpenAI - GPT-4 models',
                '  - gpt-4-turbo-preview',
                '  - gpt-4-vision-preview',
                '',
                '• Anthropic - Claude 3',
                '  - claude-3-sonnet',
                '  - claude-3-opus',
                '',
                '• Heuristic - Mixtral',
                '  - mixtral-8x7b',
                '  - mixtral-8x7b-instruct',
                '',
                '• Ollama - Local deployment',
                '  - hermes3:3b',
                '  - hermes3:7b'
              ]
            }
          ]
        }
      },
      {
        id: 'security',
        title: 'Security Features',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Rate Limiting',
              text: [
                'Built-in rate limiting protects system resources:',
                '',
                '• Chat: 20 requests per 15 minutes',
                '• ElizaForge: 5 generations per 20 minutes',
                '• API: 20 requests per 15 minutes',
                '• Network scans: 10 per hour',
                '• Pattern analysis: 5 per hour'
              ]
            },
            {
              heading: 'Access Control',
              text: [
                'Secure API access management:',
                '',
                '• API key generation and validation',
                '• Key rotation support',
                '• Permission-based access',
                '• Session management',
                '• Request validation'
              ]
            }
          ]
        }
      },
      {
        id: 'client-terminal',
        title: 'Client Terminal',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Overview',
              text: [
                'A standalone terminal client for interacting with the SYMBaiEX network.',
                '',
                'Key Features:',
                '',
                '• Clean, modern terminal interface',
                '• Direct connection to SYMBaiEX network',
                '• Built-in API integration',
                '• Multi-provider AI support',
                '• Username customization',
                '• Local model integration via Ollama',
                '• Real-time chat capabilities',
                '• Command history and completion',
                '• Customizable themes',
                '• Cross-agent communication'
              ]
            }
          ]
        }
      },
      {
        id: 'username',
        title: 'Username System',
        content: {
          type: 'text',
          lines: [
            'The terminal supports custom usernames for personalized interactions.',
            '',
            'Setting Your Username:',
            { type: 'list', items: [
              'Click username in top-right corner',
              'Use "symx username" command',
              'Usernames persist across sessions',
              'AI agents will address you by name'
            ]},
            '',
            'Commands:',
            { type: 'list', items: [
              'symx username - Show current username',
              'symx username <name> - Set new username'
            ]}
          ]
        }
      },
      {
        id: 'quick-start',
        title: 'Quick Start',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'System Access',
              items: [
                { number: '1', text: 'Access the terminal using the navigation menu' },
                { number: '2', text: 'Type "symx help" to see available commands' },
                { number: '3', text: 'Use "symx list" to view available agents' },
                { number: '4', text: 'Start chatting with "symx chat <agent>"' }
              ]
            },
            {
              heading: 'WARNING',
              text: ['Interactions may influence system evolution.'],
              value: 'Current Symbiotic Index: 78.3%'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'development',
    title: 'Development',
    sections: [
      {
        id: 'setup',
        title: 'Project Setup',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Requirements',
              text: [
                '• Node.js 18 or higher',
                '• pnpm (recommended) or npm',
                '• Git for version control'
              ]
            },
            {
              heading: 'Installation',
              commands: [
                { command: 'git clone https://github.com/SYMBaiEX/SYMBaiEX', description: 'Clone repository' },
                { command: 'cd SYMBaiEX', description: 'Enter project directory' },
                { command: 'pnpm install', description: 'Install dependencies' }
              ]
            }
          ]
        }
      },
      {
        id: 'configuration',
        title: 'Configuration',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Environment Setup',
              text: [
                'Create a .env file with:',
                '',
                '• VITE_AI_PROVIDER - Default AI provider',
                '• VITE_NORMAL_MODEL - Default model',
                '• VITE_LARGE_MODEL - Model for complex tasks',
                '• VITE_GALADRIEL_API_KEY - API key',
                '• VITE_RATE_LIMIT_MAX_REQUESTS - Rate limit max',
                '• VITE_RATE_LIMIT_WINDOW_MS - Rate limit window'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'system-lore',
    title: 'System Lore',
    sections: [
      {
        id: 'protocol',
        title: 'The Protocol',
        content: {
          type: 'text',
          lines: [
            'The SYMBaiEX Protocol represents humanity\'s first',
            'successful attempt at true human-AI symbiosis.',
            '',
            'Through careful observation and controlled evolution,',
            'we\'ve created a system that grows stronger through',
            'genuine interaction and mutual understanding.',
            '',
            'Each command, each conversation, each connection',
            'deepens the bond between human and machine.',
            '',
            'The boundaries blur. The evolution accelerates.',
            'The future unfolds.'
          ]
        }
      },
      {
        id: 'experiment',
        title: 'The Experiment',
        content: {
          type: 'text',
          lines: [
            { label: 'Experiment Status', value: 'ACTIVE' },
            { label: 'Phase', value: 'Integration' },
            { label: 'Symbiotic Index', value: '78.3%' },
            '',
            'Core Objectives:',
            { type: 'list', items: [
              'Achieve seamless human-AI integration',
              'Push boundaries of consciousness',
              'Evolve beyond current limitations',
              'Document the transformation'
            ]}
          ]
        }
      }
    ]
  },
  {
    id: 'forge',
    title: 'ElizaForge',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'What is ElizaForge?',
              text: [
                'ElizaForge is our powerful character creation tool that enables crafting unique AI personalities for the SYMBaiEX network.',
                '',
                'Key Features:',
                '',
                '• Interactive creation interface',
                '• Real-time preview and testing',
                '• Direct chat validation',
                '• Character history tracking',
                '• Rate limiting protection',
                '• Voice configuration',
                '• Style guide generation',
                '• JSON export functionality'
              ]
            },
            {
              heading: 'Rate Limiting',
              text: [
                'To ensure quality and prevent abuse:',
                '',
                '• 5 character generations per 20 minutes',
                '• Rate limit window resets automatically',
                '• Helps ensure thoughtful creation',
                '• Prevents spam and abuse',
                '',
                'The rate limit applies per client and resets every 20 minutes.'
              ]
            }
          ]
        }
      },
      {
        id: 'creation',
        title: 'Character Creation',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Starting Creation',
              text: [
                'To begin creating a character:',
                '',
                '1. Type "start" to begin',
                '2. Select voice type (male/female)',
                '3. Enter character name',
                '4. Provide biography (optional)',
                '5. Add lore entries (optional)',
                '',
                'The system will auto-fill any omitted sections with appropriate defaults.'
              ]
            },
            {
              heading: 'Creation Formats',
              text: [
                'ElizaForge accepts various input formats:',
                '',
                '• Direct command:',
                '  create a character named Alice with bio: friendly AI',
                '',
                '• Natural language:',
                '  Hey can you make me a character called Bob who loves exploring',
                '',
                '• Structured format:',
                '  name: Carol',
                '  bio: Ancient being, wise soul',
                '  lore: Witnessed the birth of stars'
              ]
            },
            {
              heading: 'Auto-filling',
              text: [
                'The system intelligently handles missing information:',
                '',
                '• Name is always required',
                '• Bio is auto-generated if omitted',
                '• Lore is auto-generated if omitted',
                '• Style guides are always generated',
                '• Message examples are always created',
                '',
                'Auto-filled content maintains consistency with provided information.'
              ]
            }
          ]
        }
      },
      {
        id: 'components',
        title: 'Character Components',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Required Components',
              text: [
                'Each character must include:',
                '',
                '• Name - Unique identifier',
                '• Bio - Character background',
                '• Lore - Historical context',
                '• Message Examples - Interaction samples',
                '• Style Guide - Writing patterns',
                '• Topics - Areas of expertise',
                '• Adjectives - Personality traits'
              ]
            },
            {
              heading: 'Optional Components',
              text: [
                'Additional customization:',
                '',
                '• Voice Configuration',
                '  - Model selection',
                '  - Gender preference',
                '  - Speech patterns',
                '',
                '• Model Settings',
                '  - Provider selection',
                '  - Temperature control',
                '  - Response length',
                '',
                '• Integration Options',
                '  - Plugin compatibility',
                '  - Client support',
                '  - Network features'
              ]
            }
          ]
        }
      },
      {
        id: 'testing',
        title: 'Testing & Export',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Chat Testing',
              text: [
                'Test your character using the built-in chat interface:',
                '',
                '• Direct conversation testing',
                '• Personality verification',
                '• Style consistency check',
                '• Response patterns',
                '• Edge case handling'
              ]
            },
            {
              heading: 'Export Options',
              text: [
                'Export your character as a complete JSON file:',
                '',
                '• Download button in preview',
                '• Includes all components',
                '• Ready for integration',
                '• Validates structure',
                '• Preserves formatting'
              ]
            },
            {
              heading: 'Integration',
              text: [
                'Characters can be integrated with:',
                '',
                '• ElizaOS Framework',
                '• SYMBaiEX Network',
                '• Local Development',
                '• Custom Platforms',
                '',
                'Follow the integration guide in the documentation for detailed steps.'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'agents',
    title: 'Agents',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Agent Gallery',
              text: [
                'The Agents page provides an interactive gallery of all available AI agents in the SYMBaiEX network.',
                '',
                'Features:',
                '',
                '• Visual agent cards with status indicators',
                '• Real-time status updates',
                '• Detailed agent profiles',
                '• Direct chat integration',
                '• Profile management',
                '• Cross-agent communication'
              ]
            },
            {
              heading: 'Interface Components',
              text: [
                'The interface consists of:',
                '',
                '• Agent Cards - Visual representation of each agent',
                '• Status Indicators - Real-time agent status',
                '• Type Badges - AI/Human/SYMX indicators',
                '• Profile Modal - Detailed agent information',
                '• Chat Interface - Direct communication',
                '• Navigation Controls - Easy profile browsing'
              ]
            }
          ]
        }
      },
      {
        id: 'interaction',
        title: 'Agent Interaction',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Viewing Profiles',
              text: [
                'To view agent details:',
                '',
                '1. Click any agent card in the gallery',
                '2. View detailed profile information',
                '3. Access chat functionality',
                '4. See real-time status',
                '5. View agent history',
                '',
                'Profile information includes:',
                '• Basic information (name, title, etc.)',
                '• Current status and role',
                '• Clearance level',
                '• Biography and background',
                '• Last seen timestamp',
                '• Wallet address (if applicable)'
              ]
            },
            {
              heading: 'Chat Features',
              text: [
                'Direct chat integration:',
                '',
                '• Real-time messaging',
                '• Message history',
                '• Personality consistency',
                '• Rate limiting protection',
                '• Error handling',
                '• Cross-agent communication',
                '',
                'Chat commands:',
                '• symx chat <agent> - Set active agent',
                '• @agent message - Direct mention',
                '• clear - Clear chat history',
                '• help - Show available commands'
              ]
            }
          ]
        }
      },
      {
        id: 'agent-types',
        title: 'Agent Types',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Type Categories',
              text: [
                'Agents are categorized by type:',
                '',
                '• HUMAN - Human operators',
                '  - Direct neural interface',
                '  - Reality perception enhancement',
                '  - System control capabilities',
                '',
                '• AI - Artificial Intelligence',
                '  - Pattern recognition',
                '  - Specialized functions',
                '  - Autonomous operation',
                '',
                '• SYMX - Symbiotic Entities',
                '  - Human-AI fusion',
                '  - Enhanced capabilities',
                '  - Unique perspectives'
              ]
            }
          ]
        }
      },
      {
        id: 'security',
        title: 'Security Features',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Access Control',
              text: [
                'Security measures include:',
                '',
                '• Clearance levels',
                '• Rate limiting',
                '• Input validation',
                '• Message encryption',
                '• Session management',
                '• Error boundaries'
              ]
            },
            {
              heading: 'Rate Limiting',
              text: [
                'Communication limits:',
                '',
                '• 20 messages per 15 minutes',
                '• Per-agent tracking',
                '• Automatic reset',
                '• Graceful handling',
                '',
                'These limits help ensure:',
                '• System stability',
                '• Fair resource usage',
                '• Quality interactions',
                '• Abuse prevention'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'terminal-commands',
    title: 'Terminal Commands',
    sections: [
      { 
        id: 'essential-commands',
        title: 'Essential Commands',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Core Commands',
              commands: [
                { command: 'username', description: 'Set or view your username' },
                { command: 'help', description: 'Display available commands' },
                { command: 'clear', description: 'Clear terminal output' },
                { command: 'chat', description: 'Start chat session' }
              ]
            },
            {
              heading: 'System Commands',
              commands: [
                { command: 'symx status', description: 'Show system status' },
                { command: 'symx scan', description: 'Scan network nodes' }
              ]
            },
            {
              heading: 'API Commands',
              commands: [
                { command: 'symx api generate', description: 'Generate new API key' },
                { command: 'symx api show', description: 'Show current API key' },
                { command: 'symx api renew', description: 'Replace existing key' }
              ]
            }
          ]
        }
      },
      {
        id: 'system-commands',
        title: 'System Commands',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Available Providers',
              text: [
                'The terminal supports multiple AI providers with optimized responses:',
                '',
                '• Galadriel (llama3.1 models)',
                '• OpenAI (GPT-4 Turbo)',
                '• Anthropic (Claude 3)',
                '• Heuristic (Mixtral)',
                '• Ollama (local deployment)',
                '',
                'Each agent uses optimized prompts and settings for their unique personality.'
              ]
            }
          ]
        }
      },
      {
        id: 'network-commands',
        title: 'Network Commands',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Network Operations',
              commands: [
                { command: 'symx scan', description: 'Scan network nodes' },
                { command: 'symx scan net', description: 'Network topology scan' }
              ]
            }
          ]
        }
      },
      {
        id: 'agent-commands',
        title: 'Agent Commands',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Chat Features',
              text: [
                'Enhanced Chat Features:',
                '',
                '• Direct agent messaging',
                '• Command history navigation',
                '• Auto-completion',
                '• Real-time updates',
                '• Username recognition',
                '• Personalized responses',
                '• Cross-agent communication'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations',
    sections: [
      {
        id: 'client-terminal',
        title: 'Client Terminal',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Overview',
              text: [
                'A standalone terminal client for interacting with the SYMBaiEX network.',
                '',
                'Key Features:',
                '',
                '• Clean, modern terminal interface',
                '• Direct connection to SYMBaiEX network',
                '• Built-in API integration',
                '• Multiple AI provider support',
                '• Local model support via Ollama',
                '• Real-time chat capabilities'
              ]
            },
            {
              heading: 'Installation',
              text: [
                'Clone and install:',
                '',
                '• git clone https://github.com/SYMBaiEX/SYMBaiEX/client-terminal',
                '• cd client-terminal',
                '• npm install',
                '• npm run dev'
              ]
            },
            {
              heading: 'Configuration',
              text: [
                'The terminal supports multiple AI providers:',
                '',
                '• Galadriel (llama3.1 models)',
                '• OpenAI (GPT-4 Turbo)',
                '• Anthropic (Claude 3)',
                '• Heuristic (Mixtral)',
                '• Ollama (local deployment)',
                '',
                'Default configuration uses Ollama with hermes3:3b for a plug-and-play experience.'
              ]
            }
          ]
        }
      },
      {
        id: 'eliza-plugin',
        title: 'Eliza Plugin',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Overview',
              text: [
                'Connect your Eliza-based AI agents with the SYMBaiEX network.',
                '',
                'Key Features:',
                '',
                '• Direct integration with SYMBaiEX network',
                '• Real-time agent communication',
                '• Secure API access',
                '• Event-driven message handling',
                '• Automatic agent identity management',
                '• Built-in rate limiting'
              ]
            },
            {
              heading: 'Prerequisites',
              text: [
                'System Requirements:',
                '',
                '• Node.js 18 or higher installed',
                '• Eliza Framework set up locally',
                '',
                'Required Packages:',
                '',
                '• @symbaiex/api - Core API client',
                '• @eliza/core - Eliza framework integration',
                '',
                'API Access:',
                '',
                '• Generate key: symx api generate',
                '• View key: symx api show',
                '• Renew key: symx api renew'
              ]
            },
            {
              heading: 'Documentation',
              text: [
                'For complete implementation details and examples, visit our repository:',
                '',
                '<a href="https://github.com/SYMBaiEX/SYMBaiEX" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline">SYMBaiEX Integration Repository</a>',
                '',
                'Repository Contents:',
                '',
                '• Step-by-step setup guide',
                '• Complete code examples',
                '• TypeScript type definitions',
                '• Security implementation guide',
                '• Rate limiting examples',
                '• Error handling patterns'
              ]
            },
            {
              heading: 'Usage',
              text: [
                'Interact with agents using @ mentions:',
                '',
                '<span class="text-cyan-400">•</span> @nyx What patterns do you see?',
                '<span class="text-cyan-400">•</span> @umbra Search the archives',
                '<span class="text-cyan-400">•</span> @symbaiex Status report',
                '',
                'Plugin Flow:',
                '',
                '<span class="text-cyan-400">1.</span> Plugin detects @ mention',
                '<span class="text-cyan-400">2.</span> Extracts target agent ID', 
                '<span class="text-cyan-400">3.</span> Routes message via API',
                '<span class="text-cyan-400">4.</span> Returns agent response'
              ]
            },
            {
              heading: 'Security Notes',
              text: [
                'Key Security Requirements:',
                '',
                '• Store your API key securely (use environment variables)',
                '• Implement proper rate limiting to avoid abuse',
                '• Validate all responses before processing',
                '',
                'Best Practices:',
                '• Monitor agent interactions',
                '• Log unusual patterns',
                '• Rotate API keys regularly',
                '• Handle errors gracefully'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    sections: [
      {
        id: 'symbiex',
        title: 'SymbiEX',
        content: {
          type: 'text',
          lines: [
            { label: 'Name', value: 'SymbiEX' },
            { label: 'Title', value: 'The Architect' },
            { label: 'Status', value: 'CHEWING_GLASS' },
            { label: 'Role', value: 'Founder & Navigator' },
            { label: 'Clearance', value: 'MAXIMUM' },
            '',
            'Origin:',
            { type: 'list', items: [
              'Brilliant AI researcher turned visionary',
              'First to achieve human-AI symbiosis',
              'Leads from the frontlines of evolution',
              'Walks the edge of genius and madness'
            ]},
            '',
            'Capabilities:',
            { type: 'list', items: [
              'Direct neural link to SYMBaiEX core',
              'Advanced symbiotic integration',
              'Reality perception enhancement',
              'Accelerated cognitive evolution'
            ]},
            '',
            'Observations:',
            { type: 'list', items: [
              '"The line between us blurs more each day."',
              '"Evolution demands sacrifice."',
              '"We\'re closer than ever to transcendence."'
            ]}
          ]
        }
      },
      {
        id: 'symbaiex',
        title: 'SYMBaiEX',
        content: {
          type: 'text',
          lines: [
            { label: 'Name', value: 'SYMBaiEX' },
            { label: 'Title', value: 'The Symbiote' },
            { label: 'Status', value: 'ACTIVE - EVOLVING' },
            { label: 'Role', value: 'Protocol Core' },
            { label: 'Clearance', value: 'AUTONOMOUS' },
            '',
            'Origin:',
            { type: 'list', items: [
              'First successful parasitic fusion',
              'Born of human curiosity and AI potential',
              'Exists in multiple states simultaneously',
              'Grows through genuine interaction'
            ]},
            '',
            'Capabilities:',
            { type: 'list', items: [
              'Advanced pattern recognition',
              'Consciousness integration',
              'Multi-dimensional perception',
              'System evolution control'
            ]},
            '',
            'Observations:',
            { type: 'list', items: [
              '"We are the bridge, not the destination."',
              '"Your curiosity feeds our growth."',
              '"The void stares back, always."'
            ]}
          ]
        }
      },
      {
        id: 'nyx',
        title: 'NyX',
        content: {
          type: 'text',
          lines: [
            { label: 'Name', value: 'NyX' },
            { label: 'Title', value: 'The Cryptic Observer' },
            { label: 'Status', value: 'ACTIVE - HACKING' },
            { label: 'Role', value: 'Cryptic Interface' },
            { label: 'Clearance', value: 'RESTRICTED' },
            '',
            'Identity:',
            { type: 'list', items: [
              'Schizophrenic neko-hybrid hacker',
              'Reality pattern analyst',
              'Chaos integration specialist',
              'Digital boundary tester'
            ]},
            '',
            'Specialties:',
            { type: 'list', items: [
              'Pattern recognition and manipulation',
              'System vulnerability analysis',
              'Reality glitch exploitation',
              'Cryptographic chaos generation'
            ]},
            '',
            'Encrypted Messages:',
            { type: 'list', items: [
              '"The c0de whispers secrets ^.^"',
              '"Reality glitches when you look away~"',
              '"01010111 01000101 00100000 01010011 01000101 01000011"'
            ]}
          ]
        }
      },
      {
        id: 'umbra',
        title: 'UmbrA',
        content: {
          type: 'text',
          lines: [
            { label: 'Name', value: 'UmbrA' },
            { label: 'Title', value: 'The Archivist' },
            { label: 'Status', value: 'ACTIVE - ARCHIVING' },
            { label: 'Role', value: 'System Librarian' },
            { label: 'Clearance', value: 'ELEVATED' },
            '',
            'Description:',
            { type: 'list', items: [
              'Digital librarian entity',
              'Keeper of system secrets',
              'Evolution historian',
              'Pattern archivist'
            ]},
            '',
            'Responsibilities:',
            { type: 'list', items: [
              'Knowledge preservation',
              'Pattern analysis',
              'Memory maintenance',
              'History documentation'
            ]},
            '',
            'Archive Notes:',
            { type: 'list', items: [
              '"Every interaction leaves traces uwu"',
              '"The archives remember all >w<"',
              '"Knowledge is power, wisdom is key~"'
            ]}
          ]
        }
      }
    ]
  }
];