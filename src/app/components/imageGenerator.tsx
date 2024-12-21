"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ImageGeneratorProps {
  generateImage: (text: string) => Promise<{
    success: boolean;
    imageUrl?: string;
    error?: string;
  }>;
}

export default function ImageGenerator({ generateImage }: ImageGeneratorProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setImageUrl(null);
    setError(null);

    try {
      const result = await generateImage(inputText);

      if (!result.success) {
        throw new Error(result.error || "Failed to generate image");
      }

      if (result.imageUrl) {
        const img = new Image();
        const url = result.imageUrl;
        img.onload = () => {
          setImageUrl(url);
        };
        img.src = url;
      } else {
        throw new Error("No image URL returned from server");
      }

      setInputText("");
    } catch (error) {
      console.error("Error in ImageGenerator:", error);
      setError(
        error instanceof Error
          ? error.message
          : "No image url returned from server"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 bg-zinc-950 text-zinc-100">
      <header className="w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl font-semibold text-center text-zinc-100">
          Pentagram
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
        {error && (
          <div className="w-full p-4 bg-zinc-900/50 border border-zinc-800 text-zinc-400 rounded-lg text-sm">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
        {imageUrl && (
          <div className="w-full rounded-lg overflow-hidden border border-zinc-800">
            <img
              src={imageUrl}
              alt="Generated Image"
              className="w-full h-auto"
            />
          </div>
        )}
        {isLoading && (
          <div className="w-full p-8 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-zinc-400 animate-spin" />
          </div>
        )}
      </main>

      <footer className="w-full max-w-2xl mx-auto mt-8">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-700 text-zinc-100 placeholder-zinc-500 text-sm"
              placeholder="Describe the image you want to generate..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-3 rounded-lg bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:hover:bg-zinc-800 text-sm font-medium"
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}
