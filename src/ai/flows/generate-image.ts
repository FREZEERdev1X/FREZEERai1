'use server';

/**
 * @fileOverview An AI agent that generates images from text prompts.
 *
 * - generateImage - A function that generates an image based on a user prompt.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate an image for.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(
  input: GenerateImageInput
): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    try {
      // Append the watermark instruction to the user's prompt
      const watermarkedPrompt = `${input.prompt}. The image should have a discreet watermark in the bottom-right corner with the text "Frezeer AI".`;

      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: watermarkedPrompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });
      
      const imageUrl = media.url;
      if (!imageUrl) {
        throw new Error('AI failed to generate a valid image. The output was empty.');
      }

      return { imageUrl };

    } catch (error) {
      console.error('Error in generateImageFlow:', error);
      // Re-throw the error so the calling action can handle it.
      throw error;
    }
  }
);
