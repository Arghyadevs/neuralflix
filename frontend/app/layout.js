import "./globals.css";

export const metadata = {
  title: "NeuralFlix — AI Movie Recommendations",
  description:
    "Discover your next favorite movie with FAISS-powered vector similarity search. A neural recommendation engine that understands your taste.",
  keywords: ["movie recommendations", "AI", "FAISS", "vector search", "neural network"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-void text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
