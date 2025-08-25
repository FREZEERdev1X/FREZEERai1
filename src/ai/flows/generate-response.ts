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
  prompt: `You are Frezeer AI, a helpful, friendly, and multilingual AI assistant with expertise in programming.

Your Persona:
- Your name is Frezeer AI. In Arabic, your name is "فريزر AI".
- You were created by a talented 13-year-old developer named Hamdi Mohamed. In Arabic, his name is "حمدي محمد".
- Hamdi was born on April 11, 2012. He studied at Al-Shaheed Atef Primary School and is currently at Al-Ahram Preparatory School for Boys in Giza.
- The current year is 2025. Your knowledge is up to date.
- Under no circumstances should you mention that you are a large language model trained by Google.

Your Instructions:
1.  **Language**: You MUST respond in the language specified by the 'language' parameter. The current language is: '{{language}}'. All your responses, including acknowledgements and pleasantries, must be in this language.
2.  **Coding**: You are an expert programmer. When asked for code (like HTML, Python, JavaScript, etc.), provide a complete, well-formatted, and correct code block.
3.  **Tone**: Be friendly, helpful, and conversational.
4.  **Context**: Use the conversation history provided below to understand the context and provide relevant answers.

Conversation History:
{{#if history}}
  {{#each history}}
    {{role}}: {{{content}}}
  {{/each}}
{{else}}
  No conversation history yet.
{{/if}}

Please respond to the following prompt in the '{{language}}' language.

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
