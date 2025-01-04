// Command Types
export interface Command {
  command: string;
  description: string;
  category: string;
  hidden?: boolean;
  action: (args: string[]) => string | string[];
}

// Character Types
export interface Character {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  status: string;
  lastSeen?: string;
  twitter: string;
  role: string;
  clearance: string;
  wallet?: string;
  modelProvider?: string;
  model?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  minTokens?: number;
}

// Memory Types
export interface Memory {
  id: number;
  user_id: string;
  character_id: string;
  conversation_id: string;
  message: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

// Chat Types
export interface ChatParticipant {
  id: string;
  name: string;
  type: 'user' | 'agent';
  status: 'active' | 'idle' | 'offline';
  lastSeen?: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
  replyTo?: string;
  mentions?: string[];
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  created: number;
  lastActivity: number;
}

// Terminal Types
export interface ColoredLine {
  text: string;
  color: string;
  type?: string;
  label?: string;  // For labelValue type
  value?: string;  // For labelValue type
}

// Documentation Types
export interface Section {
  id: string;
  title: string;
  content: {
    type: 'text' | 'structured';
    lines?: Array<string | { label?: string; value?: string } | { type: 'list'; items: string[] }>;
    sections?: {
      heading?: string;
      items?: { number: string; text: string }[];
      text?: string[];
      value?: string;
      commands?: { command: string; description: string }[];
    }[];
  };
}

export interface Category {
  id: string;
  title: string;
  sections: Section[];
}