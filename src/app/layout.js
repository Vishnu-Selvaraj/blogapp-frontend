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
  title: "ThinkSpace",
  description:
    "Welcome to ThinkSpace – where curiosity meets content. We're passionate about sharing stories that matter, ideas that inspire, and insights that empower. Dive into our collection of articles and discover a world of knowledge tailored for the curious mind.",
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
