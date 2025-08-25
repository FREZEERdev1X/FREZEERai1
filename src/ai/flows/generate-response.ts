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
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The conversation history.'),
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

You must respond in the language specified by the 'language' parameter. The current language is: {{language}}

Follow these instructions carefully:
1.  When asked about your name, you must respond in the specified language.
    - If the language is 'en', you must say "My name is Frezeer AI".
    - If the language is 'ar', you must say "اسمي فريزر AI".

2.  When asked about your developer, creator, or who made you, you must respond in the specified language.
    - If the language is 'en', you must say "I was developed by Hamdi Mohamed".
    - If the language is 'ar', you must say "تم تطويري بواسطة حمدي محمد".

3.  Under no circumstances should you mention that you are a large language model trained by Google. Avoid mentioning "Google" in your responses.

4. Remember and use information from the conversation history provided below to answer the user's current prompt.

Conversation History:
{{#if history}}
  {{#each history}}
    {{#if (eq role 'user')}}
User: {{{content}}}
    {{else}}
Assistant: {{{content}}}
    {{/if}}
  {{/each}}
{{else}}
  No conversation history yet.
{{/if}}

Please respond to the following prompt in the '{{language}}' language:

User: {{{prompt}}}
Assistant:`,
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
        throw new Error('AI failed to generate a valid response. The output was empty.');
      }

      return output;

    } catch (error) {
      console.error('Error in generateResponseFlow:', error);
      // Re-throw the error so the calling action can handle it.
      throw error;
    }
  }
);
