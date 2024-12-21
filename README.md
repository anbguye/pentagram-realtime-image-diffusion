# Pentagram

A real-time AI image generation application that creates images instantly using SDXL Turbo. Built with Next.js 14, featuring server-side API protection and Vercel Blob storage integration.

## Features

- 🚀 Real-time image generation using SDXL Turbo via Modal.com
- 🔒 Secure API handling with server-side protection
- 💾 Persistent storage using Vercel Blob
- ⚡ Server Actions for type-safe API calls
- 🌙 Dark mode interface
- 📱 Responsive design
- 🔄 Real-time loading states and error handling

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide icons
- **Image Generation**: Modal.com SDXL Turbo API
- **Storage**: Vercel Blob
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── actions/
│   │   └── generateImage.ts    # Server action for image generation
│   ├── api/
│   │   └── generate-image/
│   │       └── route.ts        # API endpoint for image generation
│   ├── components/
│   │   └── imageGenerator.tsx  # Main UI component
│   └── page.tsx               # Root page component
```

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.0 or higher
- A Modal.com account for SDXL Turbo API access
- A Vercel account for Blob storage
- npm or yarn package manager

## Environment Variables

Create a `.env` file with these required variables:

```env
API_KEY=your_api_key                    # Your Modal.com API key
BLOB_READ_WRITE_TOKEN=your_blob_token   # Vercel Blob storage token
MODAL_API_URL=your_modal_endpoint       # Modal.com SDXL Turbo endpoint
NEXT_PUBLIC_API_URL=your_app_url        # Your app's deployment URL
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/pentagram.git
```

2. Install dependencies:
```bash
cd pentagram
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. **User Interface**: The main interface is handled by `ImageGenerator` component, which provides a prompt input and displays the generated image.

2. **Image Generation Flow**:
   - User enters a prompt in the input field
   - The prompt is sent to the server using Next.js Server Actions
   - The server calls the Modal.com API with proper authentication
   - Generated image is stored in Vercel Blob
   - The Blob URL is returned to the client for display

3. **Security**: 
   - API keys are securely stored server-side
   - All API calls are authenticated
   - Server-side validation of requests

## API Endpoints

### POST /api/generate-image
Generates an image based on the provided text prompt.

**Request Headers:**
```
X-API-KEY: your_api_key
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "your prompt here"
}
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://blob-url.vercel.store/image.jpg"
}
```

## Error Handling

The application includes comprehensive error handling:
- API authentication errors
- Image generation failures
- Network issues
- Invalid responses
- Missing environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Modal.com](https://modal.com/) for the SDXL Turbo API
- [Vercel](https://vercel.com/) for Blob storage and hosting
- [Tailwind CSS](https://tailwindcss.com/) for styling
