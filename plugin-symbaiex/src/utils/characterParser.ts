import { CharacterRequest } from '../types';

export const CREATION_PATTERNS = [
  /create (?:a )?character/i,
  /make (?:a )?character/i,
  /generate (?:a )?character/i
];

const DEFAULT_VOICE = 'en_US-hfc_female-medium';

export function parseCharacterRequest(content: string): CharacterRequest | null {
  // Check if this is a character creation request
  if (!CREATION_PATTERNS.some(pattern => pattern.test(content))) {
    return null;
  }

  // Extract name
  const nameMatch = content.match(/name:?\s*([^,\n]+)/i) || 
                   content.match(/named?\s+([^,\n]+)/i) ||
                   content.match(/called\s+([^,\n]+)/i);
  if (!nameMatch) return null;
  const name = nameMatch[1].trim();

  // Extract bio
  const bioMatch = content.match(/bio:?\s*([^,\n]+)/i);
  const bio = bioMatch ? [bioMatch[1].trim()] : [];

  // Extract lore
  const loreMatch = content.match(/lore:?\s*([^,\n]+)/i);
  const lore = loreMatch ? [loreMatch[1].trim()] : [];

  // Extract personality traits
  const personalityMatch = content.match(/personality:?\s*([^,\n]+)/i);
  const adjectives = personalityMatch ? 
    personalityMatch[1].split(/[,\s]+/).map(t => t.trim()).filter(Boolean) : 
    [];

  return {
    name,
    bio,
    lore,
    messageExamples: [],
    style: {
      all: [],
      chat: [],
      post: []
    },
    topics: [],
    adjectives,
    settings: {
      voice: {
        model: DEFAULT_VOICE
      }
    }
  };
}