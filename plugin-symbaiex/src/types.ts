export interface Message {
  content: string;
  metadata?: Record<string, any>;
}

export interface ActionContext {
  message: string;
  metadata?: {
    apiKey?: string;
    baseUrl?: string;
    [key: string]: any;
  };
}

export interface ActionResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface Action {
  (context: ActionContext): Promise<ActionResult>;
}

export interface Evaluator {
  (message: Message): Promise<boolean>;
}

export interface CharacterRequest {
  name: string;
  bio: string[];
  lore: string[];
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
  settings?: {
    voice?: {
      model?: string;
    };
  };
}