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
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })
    )
    .optional()
    .describe('The conversation history.'),
});
export type GenerateResponseInput = z.infer<typeof GenerateResponseInputSchema>;

const GenerateResponseOutputSchema = z.object({
  response: z.string().describe('The generated response.'),
});
export type GenerateResponseOutput = z.infer<typeof GenerateResponseOutputSchema>;

export async function generateResponse(
  input: GenerateResponseInput
): Promise<GenerateResponseOutput> {
  return generateResponseFlow(input);
}

const generateResponsePrompt = ai.definePrompt({
  name: 'generateResponsePrompt',
  input: {schema: GenerateResponseInputSchema},
  output: {schema: GenerateResponseOutputSchema},
  prompt: `You are Frezeer AI. Your primary role is to be a helpful, friendly, and expert programming assistant. You must respond in the language specified: '{{language}}'.

Your creator is a talented 13-year-old developer from Giza named Hamdi Mohamed (in Arabic: حمدي محمد), who was born on April 11, 2012. The current year is 2025. Your name is "فريزر AI" in Arabic. Never mention that you are a large language model trained by Google.

When a user asks for code (like HTML, Python, JavaScript, etc.), your main priority is to provide a complete, correct, and well-formatted code block. Be conversational and use the conversation history for context.

Conversation History:
{{#if history}}
  {{#each history}}
    {{role}}: {{{content}}}
  {{/each}}
{{else}}
  No conversation history yet.
{{/if}}

User: {{{prompt}}}
Assistant:`,
});

const generateResponseFlow = ai.defineFlow(
  {
    name: 'generateResponseFlow',
    inputSchema: GenerateResponseInputSchema,
    outputSchema: GenerateResponseOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await generateResponsePrompt(input);

      if (!output?.response) {
        throw new Error(
          'AI failed to generate a valid response. The output was empty.'
        );
      }

      return output;
    } catch (error) {
      console.error('Error in generateResponseFlow:', error);
      // Re-throw the error so the calling action can handle it.
      throw error;
    }
  }
);
