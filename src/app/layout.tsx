import type { ReactNode } from "react";

// Minimal root layout required by Next.js.
// The actual layout (html, body, providers) lives in app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
