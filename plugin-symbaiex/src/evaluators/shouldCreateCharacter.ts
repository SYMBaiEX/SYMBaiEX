import { Evaluator, Message } from '../types';
import { CREATION_PATTERNS } from '../utils/characterParser';

export const shouldCreateCharacter: Evaluator = async (message: Message): Promise<boolean> => {
  // Check if message matches any character creation patterns
  return CREATION_PATTERNS.some(pattern => pattern.test(message.content));
};