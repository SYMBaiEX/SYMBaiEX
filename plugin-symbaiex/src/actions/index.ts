import { Action } from '../types';
import { createCharacter } from './createCharacter';

export const actions: Record<string, Action> = {
  createCharacter
};