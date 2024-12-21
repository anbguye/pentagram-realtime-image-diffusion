import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    const apiSecret = request.headers.get("X-API-KEY");
    if (apiSecret !== process.env.API_KEY) {
      return NextResponse.json({error: "Unauthorized" }, { status: 401 });
    }

    console.log("Received API Key:", apiSecret);
    console.log("Expected API Key:", process.env.API_KEY);

    console.log("Generating image for prompt:", text);

    const url = new URL(process.env.MODAL_API_URL || "");
    url.searchParams.set("prompt", text);
    
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Accept: "image/jpeg",
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Modal API Error:", errorText);
      return NextResponse.json(
        { 
          success: false, 
          error: `Image generation failed: ${response.status}` 
        },
        { status: response.status }
      );
    }

    const imageBuffer = await response.arrayBuffer();
    const fileName = `${crypto.randomUUID()}.jpeg`;

    const blob = await put(fileName, imageBuffer, {
      access: "public",
      contentType: "image/jpeg",
    });

    return NextResponse.json({
      success: true,
      imageUrl: blob.url,
    });
  } catch (error) {
    console.error("Error in generate-image:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to generate image" 
      },
      { status: 500 }
    );
  }
}
