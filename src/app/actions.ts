'use server';

import { createAI } from 'ai/rsc';
import { suggestSolarSystem } from '@/ai/flows/suggest-solar-system';
import type { SuggestSolarSystemInput } from '@/ai/flows/suggest-solar-system';

async function suggestSolarSystemAction(
  input: SuggestSolarSystemInput
): Promise<any> {
  'use server';
  try {
    const response = await suggestSolarSystem(input);
    return response;
  } catch (e: any) {
    console.error(e);
    return { error: e.message };
  }
}

export const AI = createAI({
  actions: {
    suggestSolarSystem: suggestSolarSystemAction,
  },
});
