'use server';

import { generateResponse, type GenerateResponseInput } from '@/ai/flows/generate-response';
import { z } from 'zod';

const submitMessageInput = z.object({
  prompt: z.string(),
});

export async function submitMessage(input: GenerateResponseInput) {
  const parsedInput = submitMessageInput.safeParse(input);
  if (!parsedInput.success) {
    // This should not happen with client-side validation but is good practice.
    throw new Error('Invalid input');
  }

  try {
    const result = await generateResponse({ prompt: parsedInput.data.prompt });
    return { response: result.response };
  } catch (error) {
    console.error('Error generating AI response:', error);
    return { error: 'Failed to get a response from the AI.' };
  }
}
