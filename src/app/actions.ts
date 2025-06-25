'use server';

import { suggestSolarSystem } from '@/ai/flows/suggest-solar-system';
import type { SuggestSolarSystemInput } from '@/ai/flows/suggest-solar-system';
import { buildSolarSystem } from '@/ai/flows/build-solar-system';
import type { BuildSolarSystemInput } from '@/ai/flows/build-solar-system';
import type { BuildSolarSystemOutput } from '@/lib/types';


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

export async function buildSolarSystemAction(
  input: BuildSolarSystemInput
): Promise<BuildSolarSystemOutput | { error: string }> {
  'use server';
  try {
    const response = await buildSolarSystem(input);
    return response;
  } catch (e: any) {
    console.error(e);
    return { error: e.message };
  }
}
