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
});
export type BuildSolarSystemInput = z.infer<typeof BuildSolarSystemInputSchema>;

const BuildSolarSystemOutputSchema = z.object({
  diagramSvg: z
    .string()
    .describe(
      'Một chuỗi SVG biểu diễn sơ đồ đấu nối. SVG phải rõ ràng, gọn gàng, có nhãn tiếng Việt cho các thành phần (Pin NLMT, Inverter, Tủ điện AC/DC, Đồng hồ hai chiều, Tải tiêu thụ, Lưới điện, Bộ lưu trữ) và các kết nối. Sử dụng màu sắc để phân biệt các đường dây (DC màu đỏ/đen, AC màu xanh/vàng). SVG phải có nền trắng và kích thước hợp lý.'
    ),
  specifications: z.array(
    z.object({
      component: z.string().describe('Tên thiết bị.'),
      details: z.string().describe('Thông số kỹ thuật chi tiết của thiết bị.'),
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
1.  **Tạo sơ đồ SVG (diagramSvg):**
    *   Vẽ một sơ đồ đấu nối dạng SVG rõ ràng, chuyên nghiệp và **trông hiện đại**. Sơ đồ phải có nền trắng, dễ đọc và sắp xếp hợp lý.
    *   **Thay vì các hình hộp đơn giản, hãy sử dụng các biểu tượng trực quan cho từng thành phần:**
        *   **Tấm pin NLMT (Solar Panels):** Vẽ dưới dạng một mảng các hình chữ nhật màu xanh đậm, có lưới kẻ ô để trông giống một tấm pin thực tế.
        *   **Inverter:** Vẽ là một hình hộp chữ nhật (màu xám hoặc bạc) có logo tia sét hoặc biểu tượng sóng sine nhỏ.
        *   **Bộ lưu trữ (Battery Storage):** (Nếu có) Vẽ như một khối chữ nhật lớn hoặc một chồng pin có biểu tượng pin rõ ràng.
        *   **Tủ điện AC/DC:** Một hình chữ nhật có các biểu tượng công tắc (circuit breaker) hoặc đèn LED nhỏ bên trong.
        *   **Đồng hồ điện hai chiều:** Một hình tròn với các vạch số và một mũi tên hai chiều ở giữa.
        *   **Lưới điện (Grid):** Biểu diễn bằng một biểu tượng cột điện cao thế.
        *   **Tải tiêu thụ (AC Load):** Biểu diễn bằng một biểu tượng ngôi nhà hoặc bóng đèn.
    *   Bao gồm tất cả các thành phần chính phù hợp với loại hệ thống được yêu cầu.
    *   Ghi nhãn tất cả các thành phần và đường kết nối bằng tiếng Việt, phông chữ rõ ràng.
    *   Sử dụng màu sắc để phân biệt rõ ràng các đường dây:
        *   **DC:** Dây dương (+) màu đỏ, dây âm (-) màu đen.
        *   **AC:** Sử dụng các màu như xanh, vàng, đỏ cho các pha.
        *   **Nối đất (Ground):** Dây màu xanh lá cây hoặc xanh-vàng sọc.
    *   Đảm bảo các đường kết nối được sắp xếp gọn gàng, tránh cắt chéo nhau một cách lộn xộn.

2.  **Tạo bảng thông số kỹ thuật (specifications):**
    *   Liệt kê các thông số kỹ thuật chính cho các thiết bị quan trọng như Tấm pin, Inverter, và Pin lưu trữ (nếu có).
    *   Chọn các thông số thực tế và phù hợp với công suất hệ thống. Ví dụ: công suất tấm pin, hiệu suất, loại inverter (hòa lưới, hybrid, off-grid), công suất inverter, dải điện áp MPPT, dung lượng và loại pin lưu trữ.

3.  **Tạo bảng vật tư và chi phí (billOfMaterials):**
    *   Liệt kê tất cả các thiết bị và vật tư chính cần thiết.
    *   Ước tính số lượng cần thiết (ví dụ: số lượng tấm pin).
    *   Cung cấp đơn giá và thành tiền ước tính bằng Việt Nam Đồng (₫), sử dụng các con số thực tế trên thị trường Việt Nam. Bao gồm các hạng mục như: Tấm pin, Inverter, Pin lưu trữ, Tủ điện, Dây dẫn, Giàn khung, và chi phí nhân công lắp đặt.

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
