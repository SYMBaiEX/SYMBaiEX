import { Action, ActionContext, ActionResult } from '../types';
import { parseCharacterRequest } from '../utils/characterParser';

export const createCharacter: Action = async (
  context: ActionContext
): Promise<ActionResult> => {
  try {
    const request = parseCharacterRequest(context.message);
    if (!request) {
      return {
        success: false,
        error: 'Invalid character request format'
      };
    }

    // Send character creation request to SYMBaiEX API
    const response = await fetch(`${context.metadata?.baseUrl}/api/character/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.metadata?.apiKey}`
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create character');
    }

    const data = await response.json();
    return {
      success: true,
      data: {
        markdownLink: data.markdownLink
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Character creation failed'
    };
  }
};