import { Outfit } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/mainQueryClient";
import { Toaster } from "react-hot-toast";

const outfitSans = Outfit({
  variable: "--font-Outfit-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "ThinkSpace",
    template: "%s | ThinkSpace",
  },
  description:
    "Welcome to ThinkSpace – where curiosity meets content. We're passionate about sharing stories that matter, ideas that inspire, and insights that empower. Dive into our collection of articles and discover a world of knowledge tailored for the curious mind.",
  keywords: [
    "ThinkSpace",
    "ThinkSpace blog",
    "blogging platform",
    "personal blog",
    "creative writing",
    "storytelling platform",
    "ideas and insights",
    "thoughtful articles",
    "knowledge sharing",
    "content writing blog",
    "modern blog website",
    "SEO friendly blog",
    "Next.js blog",
    "developer blog",
    "tech blog",
    "lifestyle blog",
    "finance blog",
    "Ai blogs",
    "inspiration blog",
    "articles platform",
    "read blogs online",
    "subscribe to blog",
  ],
  authors: [
    {
      name: "ThinkSpace by VSR",
      url: "https://thinkspace-nine.vercel.app",
    },
  ],
  openGraph: {
    title: "ThinkSpace",
    description:
      "Welcome to ThinkSpace – where curiosity meets content. We're passionate about sharing stories that matter, ideas that inspire, and insights that empower. Dive into our collection of articles and discover a world of knowledge tailored for the curious mind.",
    url: "https://thinkspace-nine.vercel.app",
    siteName: "ThinkSpace Blog",
    images: [
      {
        url: "https://thinkspace-nine.vercel.app/images/opengraph-image.png", // Path to your image in the public folder
        width: 1200,
        height: 630,
        alt: "ThinkSpace Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "0.85rem",
          },
          duration: 4000,
        }}
      />
      <html lang="en">
        <body className={`${outfitSans.variable}`}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
