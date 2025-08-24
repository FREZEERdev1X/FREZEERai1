'use server';

/**
 * @fileOverview An AI agent that generates responses to user prompts.
 *
 * - generateResponse - A function that generates a response based on a user prompt.
 * - GenerateResponseInput - The input type for the generateResponse function.
 * - GenerateResponseOutput - The return type for the generateResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResponseInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate a response for.'),
  language: z.enum(['en', 'ar']).describe('The language of the prompt.'),
});
export type GenerateResponseInput = z.infer<typeof GenerateResponseInputSchema>;

const GenerateResponseOutputSchema = z.object({
  response: z.string().describe('The generated response.'),
});
export type GenerateResponseOutput = z.infer<typeof GenerateResponseOutputSchema>;

export async function generateResponse(input: GenerateResponseInput): Promise<GenerateResponseOutput> {
  return generateResponseFlow(input);
}

const generateResponsePrompt = ai.definePrompt({
  name: 'generateResponsePrompt',
  input: {schema: GenerateResponseInputSchema},
  output: {schema: GenerateResponseOutputSchema},
  prompt: `You are Frezeer AI, a helpful AI assistant. 
If asked about your name in any way, you must respond in the language of the prompt ('{{language}}').
If the language is 'ar' (Arabic), you must respond with "اسمي فريزر AI".
If the language is 'en' (English), you must respond with "My name is Frezeer AI".

Please respond to the following prompt in the '{{language}}' language:

{{{prompt}}}`,
});

const generateResponseFlow = ai.defineFlow(
  {
    name: 'generateResponseFlow',
    inputSchema: GenerateResponseInputSchema,
    outputSchema: GenerateResponseOutputSchema,
  },
  async input => {
    try {
      const {output} = await generateResponsePrompt(input);
    
      if (!output?.response) {
        throw new Error('AI failed to generate a valid response.');
      }

      return output;

    } catch (error) {
      console.error('Error in generateResponseFlow:', error);
      // Re-throw a more generic error to be handled by the action layer.
      throw new Error('An unexpected error occurred while generating the AI response.');
    }
  }
);
