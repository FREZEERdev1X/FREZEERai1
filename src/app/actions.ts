'use server';

import { generateResponse, type GenerateResponseInput } from '@/ai/flows/generate-response';
import { z } from 'zod';

const submitMessageInput = z.object({
  prompt: z.string(),
  language: z.enum(['en', 'ar']),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
});

export async function submitMessage(input: z.infer<typeof submitMessageInput>): Promise<{ response?: string; error?: string }> {
  const parsedInput = submitMessageInput.safeParse(input);
  if (!parsedInput.success) {
    console.error('Invalid input:', parsedInput.error);
    return { error: 'Invalid input' };
  }

  try {
    const result = await generateResponse({ 
      prompt: parsedInput.data.prompt,
      language: parsedInput.data.language,
      history: parsedInput.data.history,
    });
    if (result?.response) {
      return { response: result.response };
    }
    // If result or result.response is null/undefined, throw an error to be caught below.
    throw new Error('Received an empty response from the AI.');
  } catch (error) {
    console.error('Error generating AI response:', error);
    return { error: 'Failed to get a response from the AI.' };
  }
}
