/**
 * @file layout.tsx
 * @description The root layout for the entire application.
 *
 * This component is the main entry point that wraps every page. It's
 * responsible for setting up the foundational HTML structure, global styles,
 * and application-wide context providers.
 *
 * Key responsibilities include:
 * - Wrapping the application in `VendorProvider` to make global state
 * accessible to all components.
 * - Initializing the `Toaster` component so that toast notifications can be
 * triggered from anywhere in the app without additional setup.
 * - Applying the base font (`Inter`) and theme colors for light/dark modes
 * to the `<body>` tag.
 */
import { Inter } from "next/font/google";
import "./globals.css";
import { VendorProvider } from "../context/VendorContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vendor Management Panel",
  description: "Manage your vendors and their locations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
      >
        <VendorProvider>
          {children}
          <Toaster position="bottom-right" />
        </VendorProvider>
      </body>
    </html>
  );
}
