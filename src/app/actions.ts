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
    console.error('Invalid input:', parsedInput.error.flatten());
    return { error: 'Invalid input provided.' };
  }

  try {
    const result = await generateResponse({ 
      prompt: parsedInput.data.prompt,
      language: parsedInput.data.language,
      history: parsedInput.data.history,
    });
    
    // The flow now handles the check for a valid response.
    // If it throws, the catch block below will handle it.
    return { response: result.response };

  } catch (error) {
    console.error('Error generating AI response in action:', error);
    // Return a structured error message. The UI will handle displaying it.
    // Check if the error is an instance of Error to safely access the message property.
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `Failed to get a response from the AI: ${errorMessage}` };
  }
}
