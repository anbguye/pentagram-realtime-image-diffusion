"use server";

export async function generateImage(text: string) {
  try {
    if (!process.env.API_KEY) {
      throw new Error('API_KEY environment variable is not set');
    }

    // Get the base URL from environment variables or default to localhost
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/generate-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.API_KEY || "",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in generateImage:", error);
    throw error;
  }
}