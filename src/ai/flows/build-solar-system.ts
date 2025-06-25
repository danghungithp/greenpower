'use server';
/**
 * @fileOverview Defines a Genkit flow for designing a complete solar panel system.
 *
 * - buildSolarSystem - A function that takes system type and power capacity to generate a system design.
 * - BuildSolarSystemInput - The input type for the buildSolarSystem function.
 * - BuildSolarSystemOutput - The return type for the buildSolarSystem function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const BuildSolarSystemInputSchema = z.object({
  systemType: z
    .string()
    .describe(
      'Loại hệ thống điện mặt trời (ví dụ: "grid-tie", "off-grid", "hybrid").'
    ),
  powerCapacity: z
    .number()
    .describe('Công suất mong muốn của hệ thống tính bằng kWp.'),
  customData: z.string().optional().describe('Dữ liệu tùy chỉnh chứa URL sản phẩm hoặc các ghi chú để làm nguồn tham khảo cho việc báo giá.'),
});
export type BuildSolarSystemInput = z.infer<typeof BuildSolarSystemInputSchema>;

const BuildSolarSystemOutputSchema = z.object({
  specifications: z.array(
    z.object({
      component: z.string().describe('Tên thiết bị.'),
      details: z.string().describe('Thông số kỹ thuật chi tiết của thiết bị.'),
      referenceUrl: z.string().optional().describe('URL tham khảo cho sản phẩm nếu có.'),
    })
  ),
  billOfMaterials: z.array(
    z.object({
      item: z.string().describe('Tên thiết bị hoặc vật tư.'),
      quantity: z.string().describe('Số lượng.'),
      price: z
        .string()
        .describe('Đơn giá của thiết bị, định dạng tiền tệ Việt Nam (₫).'),
      total: z
        .string()
        .describe('Thành tiền, định dạng tiền tệ Việt Nam (₫).'),
      referenceUrl: z.string().optional().describe('URL tham khảo cho sản phẩm nếu có.'),
    })
  ),
});
export type BuildSolarSystemOutput = z.infer<
  typeof BuildSolarSystemOutputSchema
>;

export async function buildSolarSystem(
  input: BuildSolarSystemInput
): Promise<BuildSolarSystemOutput> {
  return buildSolarSystemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'buildSolarSystemPrompt',
  input: { schema: BuildSolarSystemInputSchema },
  output: { schema: BuildSolarSystemOutputSchema },
  prompt: `Bạn là một kỹ sư chuyên nghiệp chuyên thiết kế hệ thống điện mặt trời tại Việt Nam. Dựa trên yêu cầu của người dùng về loại hệ thống và công suất, hãy tạo ra một bộ thiết kế hoàn chỉnh. Trả lời hoàn toàn bằng tiếng Việt.

Yêu cầu của người dùng:
- Loại hệ thống: {{{systemType}}}
- Công suất: {{{powerCapacity}}} kWp

Nhiệm vụ của bạn:
1.  **Tạo bảng thông số kỹ thuật (specifications):**
    *   Liệt kê các thông số kỹ thuật chính cho các thiết bị quan trọng như Tấm pin, Inverter, và Pin lưu trữ (nếu có và phù hợp với loại hệ thống).
    *   Chọn các thông số thực tế và phù hợp với công suất hệ thống. Ví dụ: công suất tấm pin, hiệu suất, loại inverter (hòa lưới, hybrid, off-grid), công suất inverter, dải điện áp MPPT, dung lượng và loại pin lưu trữ.
    *   Nếu tìm thấy sản phẩm tương ứng trong dữ liệu tùy chỉnh, hãy thêm URL tham khảo vào trường 'referenceUrl'.

2.  **Tạo bảng vật tư và chi phí (billOfMaterials):**
    *   Liệt kê tất cả các thiết bị và vật tư chính cần thiết.
    *   Ước tính số lượng cần thiết (ví dụ: số lượng tấm pin).
    *   Cung cấp đơn giá và thành tiền ước tính bằng Việt Nam Đồng (₫), sử dụng các con số thực tế trên thị trường Việt Nam. Bao gồm các hạng mục như: Tấm pin, Inverter, Pin lưu trữ (nếu có), Tủ điện, Dây dẫn, Giàn khung, và chi phí nhân công lắp đặt.

{{#if customData}}
Hãy ưu tiên sử dụng các thông tin, sản phẩm, hoặc đường dẫn sau đây làm nguồn tham khảo chính cho việc tạo thông số kỹ thuật và báo giá. Nếu tìm thấy một sản phẩm phù hợp trong danh sách này, hãy điền URL của nó vào trường 'referenceUrl' của mục tương ứng trong cả bảng thông số kỹ thuật và bảng vật tư.
---
{{{customData}}}
---
{{/if}}

Hãy đảm bảo rằng tất cả các thông tin đều nhất quán và phù hợp với nhau.`,
});

const buildSolarSystemFlow = ai.defineFlow(
  {
    name: 'buildSolarSystemFlow',
    inputSchema: BuildSolarSystemInputSchema,
    outputSchema: BuildSolarSystemOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
