'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting solar panel systems based on user inputs.
 *
 * - suggestSolarSystem - A function that takes user inputs (location, energy requirements, roof size) and returns a solar panel system suggestion.
 * - SuggestSolarSystemInput - The input type for the suggestSolarSystem function.
 * - SuggestSolarSystemOutput - The return type for the suggestSolarSystem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

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
  customData: z.string().optional().describe('Dữ liệu tùy chỉnh do người dùng cung cấp, chẳng hạn như URL sản phẩm hoặc các ghi chú cụ thể để đưa vào đề xuất.'),
});
export type SuggestSolarSystemInput = z.infer<typeof SuggestSolarSystemInputSchema>;

const SuggestSolarSystemOutputSchema = z.object({
  systemType: z.string().describe('Loại hệ thống được đề xuất (ví dụ: "Hòa lưới", "Hybrid", "Độc lập").'),
  panel: z.object({
      type: z.string().describe('Loại, thương hiệu và công suất của tấm pin mặt trời được đề xuất (ví dụ: "Canadian Solar 550W").'),
      quantity: z.number().describe('Số lượng tấm pin cần thiết.'),
      totalPower: z.string().describe('Tổng công suất của hệ thống pin (ví dụ: "5.5 kWp").'),
      referenceUrl: z.string().optional().describe('URL tham khảo cho sản phẩm tấm pin nếu có.')
  }),
  inverter: z.object({
      type: z.string().describe('Loại, thương hiệu và công suất của inverter được đề xuất (ví dụ: "Deye Hybrid 5kW").'),
      referenceUrl: z.string().optional().describe('URL tham khảo cho sản phẩm inverter nếu có.')
  }),
  storage: z.object({
      needed: z.boolean().describe('Hệ thống có cần pin lưu trữ hay không. Chỉ cần thiết cho hệ thống Hybrid hoặc Độc lập.'),
      capacity: z.string().optional().describe('Dung lượng pin lưu trữ được đề xuất nếu cần (ví dụ: "10 kWh").'),
      referenceUrl: z.string().optional().describe('URL tham khảo cho sản phẩm pin lưu trữ nếu có.')
  }),
  estimatedCost: z.string().describe('Tổng chi phí ước tính cho toàn bộ hệ thống, định dạng tiền tệ Việt Nam (₫).'),
  estimatedSavings: z.string().describe('Ước tính khoản tiết kiệm hàng tháng và hàng năm từ hệ thống pin mặt trời. Trình bày ngắn gọn, ví dụ: "Khoảng 2.000.000₫/tháng và 24.000.000₫/năm."'),
  environmentalImpact: z.string().describe('Ước tính lượng khí thải CO2 giảm được hàng năm. Trình bày ngắn gọn, ví dụ: "Giảm khoảng 5 tấn CO2 mỗi năm."'),
  notes: z.string().describe('Các ghi chú, giải thích hoặc lý do bổ sung cho đề xuất. Có thể sử dụng định dạng Markdown.'),
});
export type SuggestSolarSystemOutput = z.infer<typeof SuggestSolarSystemOutputSchema>;

export async function suggestSolarSystem(input: SuggestSolarSystemInput): Promise<SuggestSolarSystemOutput> {
  return suggestSolarSystemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSolarSystemPrompt',
  input: {schema: SuggestSolarSystemInputSchema},
  output: {schema: SuggestSolarSystemOutputSchema},
  prompt: `Bạn là một chuyên gia tư vấn năng lượng mặt trời tại Việt Nam. Dựa vào vị trí, nhu cầu năng lượng và diện tích mái nhà của chủ nhà, hãy đề xuất một hệ thống pin mặt trời phù hợp bằng cách điền vào các trường trong cấu trúc đầu ra. Trả lời hoàn toàn bằng tiếng Việt.

Phân tích các yêu cầu để xác định loại hệ thống phù hợp nhất (Hòa lưới, Hybrid, hoặc Độc lập).
- Nếu nhu cầu năng lượng cao và không có yêu cầu lưu trữ, hãy đề xuất "Hòa lưới".
- Nếu có yêu cầu sử dụng điện khi mất lưới, hãy đề xuất "Hybrid".
- Nếu ở nơi không có lưới điện, hãy đề xuất "Độc lập".

Tính toán số lượng tấm pin và công suất hệ thống cần thiết. Lựa chọn các thiết bị (tấm pin, inverter, pin lưu trữ) có thông số kỹ thuật và thương hiệu phổ biến tại thị trường Việt Nam.

{{#if customData}}
Hãy ưu tiên sử dụng các thông tin, sản phẩm, hoặc đường dẫn sau đây làm nguồn tham khảo chính cho đề xuất của bạn. Nếu có thông tin về giá hoặc sản phẩm cụ thể, hãy dùng nó để tăng độ chính xác. Nếu bạn tìm thấy một sản phẩm phù hợp trong danh sách này, hãy điền URL của nó vào trường 'referenceUrl' của mục tương ứng (panel, inverter, storage).
---
{{{customData}}}
---
{{/if}}

Dưới đây là thông tin chi tiết của khách hàng:
- Vị trí: {{{location}}}
- Nhu cầu năng lượng: {{{energyRequirements}}} kWh/tháng
- Diện tích mái: {{{roofSize}}} m²`,
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
