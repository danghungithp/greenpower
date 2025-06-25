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
    .describe('Vị trí của dự án (ví dụ: thành phố, tỉnh).'),
  energyRequirements: z
    .string()
    .describe('Mức tiêu thụ năng lượng trung bình hàng tháng tính bằng kWh.'),
  roofSize: z
    .string()
    .describe('Diện tích mái nhà có sẵn tính bằng mét vuông.'),
});
export type SuggestSolarSystemInput = z.infer<typeof SuggestSolarSystemInputSchema>;

const SuggestSolarSystemOutputSchema = z.object({
  systemSuggestion: z
    .string()
    .describe('Một đề xuất chi tiết cho hệ thống pin mặt trời, bao gồm loại pin, số lượng pin, loại biến tần và chi phí ước tính.'),
  estimatedSavings: z
    .string()
    .describe('Ước tính khoản tiết kiệm hàng tháng và hàng năm từ hệ thống pin mặt trời.'),
  environmentalImpact: z
    .string()
    .describe('Ước tính lượng khí thải carbon giảm được khi sử dụng hệ thống pin mặt trời.'),
});
export type SuggestSolarSystemOutput = z.infer<typeof SuggestSolarSystemOutputSchema>;

export async function suggestSolarSystem(input: SuggestSolarSystemInput): Promise<SuggestSolarSystemOutput> {
  return suggestSolarSystemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSolarSystemPrompt',
  input: {schema: SuggestSolarSystemInputSchema},
  output: {schema: SuggestSolarSystemOutputSchema},
  prompt: `Bạn là một chuyên gia tư vấn năng lượng mặt trời. Dựa vào vị trí, nhu cầu năng lượng và diện tích mái nhà của chủ nhà, hãy đề xuất một hệ thống pin mặt trời phù hợp. Cung cấp chi tiết về loại pin, số lượng pin, loại biến tần, chi phí ước tính, tiền tiết kiệm hàng tháng/hàng năm và tác động đến môi trường. Trả lời bằng tiếng Việt.

Vị trí: {{{location}}}
Nhu cầu năng lượng: {{{energyRequirements}}} kWh/tháng
Diện tích mái: {{{roofSize}}} m²`,
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
