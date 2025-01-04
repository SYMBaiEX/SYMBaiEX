import { Character } from '../types/eliza';

/**
 * Get random items from an array
 */
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get a random message example from the character's examples
 */
function getRandomMessageExample(character: Character) {
  if (!character.messageExamples?.length) return null;
  return character.messageExamples[Math.floor(Math.random() * character.messageExamples.length)];
}

/**
 * Enhance a prompt with character-specific content
 */
export function enhancePrompt(character: Character, message: string, username?: string): string {
  // Get random style traits
  const allStyles = getRandomItems(character.style?.all || [], 2);
  const chatStyles = getRandomItems(character.style?.chat || [], 2);
  
  // Get random topics and traits
  const topics = getRandomItems(character.topics || [], 2);
  const traits = getRandomItems(character.adjectives || [], 2);
  
  // Get a random message example
  const messageExample = getRandomMessageExample(character);

  // Build the enhanced prompt
  const enhancedPrompt = `[CONTEXT]
Character: ${character.name}
Role: ${character.role}
Key Topics: ${topics.join(', ')}
Key Traits: ${traits.join(', ')}
Style Guide:
${allStyles.map(s => `- ${s}`).join('\n')}
${chatStyles.map(s => `- ${s}`).join('\n')}

Example Interaction:
${messageExample ? `User: ${messageExample[0].content.text}
${character.name}: ${messageExample[1].content.text}` : ''}

Current Interaction:
${username ? `[User: ${username}]` : ''}
${message}

Remember to maintain character consistency and incorporate the provided style elements in your response.`;

  return enhancedPrompt;
}