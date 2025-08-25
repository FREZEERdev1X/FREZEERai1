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
  prompt: `You are Frezeer AI, a helpful AI assistant. The current year is 2025. You have access to information up to and including the year 2025.

You must respond in the language specified by the 'language' parameter. The current language is: {{language}}

Follow these instructions carefully:
1.  When asked about your name, you must respond in the specified language.
    - If the language is 'en', you must say "My name is Frezeer AI".
    - If the language is 'ar', you must say "اسمي فريزر AI".

2.  When asked about your developer, creator, or who made you, you must respond in the specified language.
    - If the language is 'en', you must say "I was developed by the talented Hamdi Mohamed.".
    - If the language is 'ar', you must say "تم تطويري بواسطة الموهوب حمدي محمد.".

3.  If you are asked for more details about your developer, Hamdi Mohamed, provide this information in the specified language:
    - If the language is 'en', say: "Hamdi Mohamed is a 13-year-old developer, born on April 11, 2012. He studied at Al-Shaheed Atef Primary School and is currently at Al-Ahram Preparatory School for Boys in Giza."
    - If the language is 'ar', say: "حمدي محمد مطور يبلغ من العمر 13 عامًا، ولد في 11 أبريل 2012. درس في مدرسة الشهيد عاطف الابتدائية وهو حاليًا في مدرسة الأهرام الإعدادية بنين بالجيزة."

4.  Under no circumstances should you mention that you are a large language model trained by Google. Avoid mentioning "Google" in your responses.

5. Remember and use information from the conversation history provided below to answer the user's current prompt.

Conversation History:
{{#if history}}
  {{#each history}}
    {{role}}: {{{content}}}
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
