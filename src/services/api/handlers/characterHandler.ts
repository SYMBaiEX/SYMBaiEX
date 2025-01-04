import { galadrielAPI } from '../../ai/galadriel';
import { rateLimiter } from '../middleware/rateLimit';
import { db } from '../../db';
import { APIResponse } from '../types';
import { CharacterRequest } from '../../../types/eliza';
import { extractAndValidateJson } from '../../../utils/jsonParser';

export async function handleCharacterCreate(request: CharacterRequest): Promise<APIResponse> {
  try {
    if (!rateLimiter.canMakeRequest()) {
      return {
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        data: {
          retryAfter: rateLimiter.getTimeUntilReset(),
          remaining: rateLimiter.getRemainingRequests()
        }
      };
    }

    // Validate request
    if (!request.name) {
      return {
        success: false,
        error: 'Character name is required'
      };
    }

    // Generate character using Galadriel
    const response = await galadrielAPI.chat('character', JSON.stringify({
      ...request,
      modelProvider: 'galadriel',
      model: 'llama3.1:70b'
    }));
    
    if (response.error) {
      throw new Error(response.error);
    }

    // Parse and validate the response
    const character = extractAndValidateJson(response.message);

    // Generate character filename in correct format
    const filename = `${character.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.character.json`;
    
    // Store character JSON and get raw URL
    const rawUrl = `${process.env.VITE_API_URL}/raw/characters/${filename}`;

    // Log the created character
    await db.addCharacterLog(character);

    rateLimiter.incrementRequests();

    return {
      success: true,
      data: {
        character,
        rawUrl,
        markdownLink: `[${character.name}.character.json](${rawUrl})`
      }
    };
  } catch (error) {
    console.error('Character creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create character',
      data: {
        remaining: rateLimiter.getRemainingRequests()
      }
    };
  }
}