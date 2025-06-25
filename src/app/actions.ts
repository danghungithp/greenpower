'use server';

import { suggestSolarSystem } from '@/ai/flows/suggest-solar-system';
import type { SuggestSolarSystemInput } from '@/ai/flows/suggest-solar-system';

export async function suggestSolarSystemAction(
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
