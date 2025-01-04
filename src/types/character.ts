export interface BaseCharacter {
  id: string;
  name: string;
  bio: string | string[];
  modelProvider?: string;
  model?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  minTokens?: number;
  role?: string;
  lore?: string[];
  messageExamples?: Array<[
    { user: string; content: { text: string } },
    { user: string; content: { text: string } }
  ]>;
  style?: {
    all: string[];
    chat: string[];
    post: string[];
  };
  topics?: string[];
  adjectives?: string[];
}

export interface AppCharacter extends BaseCharacter {
  title: string;
  imageUrl: string;
  status: string;
  lastSeen?: string;
  twitter: string;
  clearance: string;
  wallet?: string;
}

export interface AICharacter extends BaseCharacter {
  personality: string;
  systemPrompt: string;
  temperature: number;
  minTokens: number;
  maxTokens: number;
}