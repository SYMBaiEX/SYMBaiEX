import { UUID } from './common';

export type ModelProviderName = 'ollama' | 'galadriel' | 'openai' | 'anthropic' | 'heuristic';

export interface MessageExample {
  user: string;
  content: {
    text: string;
  };
}

export type Plugin = string;
export type Client = string;

export interface Character {
  /** Optional unique identifier */
  id?: UUID;
  
  /** Character name */
  name: string;
  
  /** Optional username */
  username?: string;
  
  /** Optional system prompt */
  system?: string;
  
  /** Model provider to use */
  modelProvider: ModelProviderName;
  
  /** Image model provider to use, if different from modelProvider */
  imageModelProvider?: ModelProviderName;
  
  /** Optional model endpoint override */
  modelEndpointOverride?: string;
  
  /** Optional prompt templates */
  templates?: {
    goalsTemplate?: string;
    factsTemplate?: string;
    messageHandlerTemplate?: string;
    shouldRespondTemplate?: string;
    continueMessageHandlerTemplate?: string;
    evaluationTemplate?: string;
    twitterSearchTemplate?: string;
    twitterActionTemplate?: string;
    twitterPostTemplate?: string;
    twitterMessageHandlerTemplate?: string;
    twitterShouldRespondTemplate?: string;
    farcasterPostTemplate?: string;
    lensPostTemplate?: string;
    farcasterMessageHandlerTemplate?: string;
    lensMessageHandlerTemplate?: string;
    farcasterShouldRespondTemplate?: string;
    lensShouldRespondTemplate?: string;
    telegramMessageHandlerTemplate?: string;
    telegramShouldRespondTemplate?: string;
    discordVoiceHandlerTemplate?: string;
    discordShouldRespondTemplate?: string;
    discordMessageHandlerTemplate?: string;
    slackMessageHandlerTemplate?: string;
    slackShouldRespondTemplate?: string;
  };
  
  /** Character biography */
  bio: string | string[];
  
  /** Character background lore */
  lore: string[];
  
  /** Example messages */
  messageExamples: MessageExample[][];
  
  /** Example posts */
  postExamples: string[];
  
  /** Known topics */
  topics: string[];
  
  /** Character traits */
  adjectives: string[];
  
  /** Optional knowledge base */
  knowledge?: string[];
  
  /** Supported client platforms */
  clients: Client[];
  
  /** Available plugins */
  plugins: Plugin[];
  
  /** Optional configuration */
  settings?: {
    secrets?: { [key: string]: string };
    intiface?: boolean;
    voice?: {
      model?: string; // For VITS
      url?: string; // Legacy VITS support
      elevenlabs?: {
        // New structured ElevenLabs config
        voiceId: string;
        model?: string;
        stability?: string;
        similarityBoost?: string;
        style?: string;
        useSpeakerBoost?: string;
      };
    };
    model?: string;
    embeddingModel?: string;
    chains?: {
      evm?: any[];
      solana?: any[];
      [key: string]: any[];
    };
  };
  
  /** Optional client-specific config */
  clientConfig?: {
    discord?: {
      shouldIgnoreBotMessages?: boolean;
      shouldIgnoreDirectMessages?: boolean;
      shouldRespondOnlyToMentions?: boolean;
      messageSimilarityThreshold?: number;
      isPartOfTeam?: boolean;
      teamAgentIds?: string[];
      teamLeaderId?: string;
      teamMemberInterestKeywords?: string[];
    };
    telegram?: {
      shouldIgnoreBotMessages?: boolean;
      shouldIgnoreDirectMessages?: boolean;
      shouldRespondOnlyToMentions?: boolean;
      shouldOnlyJoinInAllowedGroups?: boolean;
      allowedGroupIds?: string[];
      messageSimilarityThreshold?: number;
      isPartOfTeam?: boolean;
      teamAgentIds?: string[];
      teamLeaderId?: string;
      teamMemberInterestKeywords?: string[];
    };
    slack?: {
      shouldIgnoreBotMessages?: boolean;
      shouldIgnoreDirectMessages?: boolean;
    };
  };
  
  /** Writing style guides */
  style: {
    all: string[];
    chat: string[];
    post: string[];
  };
  
  /** Optional Twitter profile */
  twitterProfile?: {
    id: string;
    username: string;
    screenName: string;
    bio: string;
    nicknames?: string[];
  };
  
  /** Optional NFT prompt */
  nft?: {
    prompt: string;
  };
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
}