'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitImagePrompt } from '@/app/actions';
import { FrezeerLogo } from '../icons';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { Wand2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';


export function ImagePanel() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { translations } = useLanguage();

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setImageUrl(null); // Clear previous image

    try {
      const result = await submitImagePrompt({ prompt });

      if (result.imageUrl) {
        setImageUrl(result.imageUrl);
      } else if (result.error) {
        throw new Error(result.error);
      } else {
        throw new Error('No image or error from AI');
      }
    } catch (error) {
      console.error(error);
      const description = error instanceof Error ? error.message : 'Failed to generate image.';
      toast({
        variant: 'destructive',
        title: 'Error',
        description: description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-between p-4">
      <div className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-6">
        <div className="flex-grow flex items-center justify-center w-full">
            <Card className="aspect-square w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
                <CardContent className="p-0 h-full">
                    {isLoading && (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                            <div className="flex flex-col items-center gap-4">
                                <Wand2 className="h-10 w-10 animate-bounce text-primary" />
                                <p className="text-muted-foreground">Generating your image...</p>
                            </div>
                        </div>
                    )}
                    {!isLoading && imageUrl && (
                        <Image 
                            src={imageUrl} 
                            alt={prompt} 
                            width={512} 
                            height={512}
                            className="h-full w-full object-cover" 
                        />
                    )}
                     {!isLoading && !imageUrl && (
                        <div className="flex h-full w-full items-center justify-center bg-muted/40">
                             <div className="flex flex-col items-center gap-4 text-center">
                                <div className="rounded-full border p-4 glow">
                                    <FrezeerLogo className="h-16 w-16 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight">Image Generation</h2>
                                <p className="max-w-md text-muted-foreground">
                                    Describe the image you want to create. Be as specific as you want.
                                </p>
                             </div>
                        </div>
                     )}
                </CardContent>
            </Card>
        </div>
        <div className="w-full max-w-2xl">
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic city with flying cars at sunset, photorealistic..."
              rows={2}
              className="resize-none rounded-2xl border-border/80 bg-background/70 p-4 pr-24 shadow-sm"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handlePromptSubmit();
                }
              }}
            />
            <Button
              onClick={handlePromptSubmit}
              disabled={isLoading || !prompt.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
