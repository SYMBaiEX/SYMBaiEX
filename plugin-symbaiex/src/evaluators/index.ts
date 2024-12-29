import { Evaluator } from '../types';
import { shouldCreateCharacter } from './shouldCreateCharacter';

export const evaluators: Record<string, Evaluator> = {
  shouldCreateCharacter
};