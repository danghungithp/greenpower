// use server'

/**
 * @fileOverview This file defines a Genkit flow for suggesting solar panel systems based on user inputs.
 *
 * - suggestSolarSystem - A function that takes user inputs (location, energy requirements, roof size) and returns a solar panel system suggestion.
 * - SuggestSolarSystemInput - The input type for the suggestSolarSystem function.
 * - SuggestSolarSystemOutput - The return type for the suggestSolarSystem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSolarSystemInputSchema = z.object({
  location: z
    .string()
    .describe('The location of the property (e.g., city, state).'),
  energyRequirements: z
    .string()
    .describe('The average monthly energy consumption in kWh.'),
  roofSize: z
    .string()
    .describe('The available roof area in square feet.'),
});
export type SuggestSolarSystemInput = z.infer<typeof SuggestSolarSystemInputSchema>;

const SuggestSolarSystemOutputSchema = z.object({
  systemSuggestion: z
    .string()
    .describe('A detailed suggestion for a solar panel system, including panel type, number of panels, inverter type, and estimated cost.'),
  estimatedSavings: z
    .string()
    .describe('An estimate of the monthly and annual savings from the solar panel system.'),
  environmentalImpact: z
    .string()
    .describe('The estimated reduction in carbon footprint from using the solar panel system.'),
});
export type SuggestSolarSystemOutput = z.infer<typeof SuggestSolarSystemOutputSchema>;

export async function suggestSolarSystem(input: SuggestSolarSystemInput): Promise<SuggestSolarSystemOutput> {
  return suggestSolarSystemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSolarSystemPrompt',
  input: {schema: SuggestSolarSystemInputSchema},
  output: {schema: SuggestSolarSystemOutputSchema},
  prompt: `You are a solar energy consultant. Based on the homeowner's location, energy requirements, and roof size, suggest an appropriate solar panel system. Provide details on panel type, number of panels, inverter type, estimated cost, monthly/annual savings, and environmental impact.

Location: {{{location}}}
Energy Requirements: {{{energyRequirements}}} kWh/month
Roof Size: {{{roofSize}}} sq ft`,
});

const suggestSolarSystemFlow = ai.defineFlow(
  {
    name: 'suggestSolarSystemFlow',
    inputSchema: SuggestSolarSystemInputSchema,
    outputSchema: SuggestSolarSystemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
