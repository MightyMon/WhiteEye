import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import { ProgressSpinner } from 'primereact/progressspinner'; // Import ProgressSpinner
import SessionProviderWrapper from "./component/SessionProviderWrapper"; // Adjust the import path as needed
import SessionHandler from "./component/SessionHandler";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" style={{ height: '100%' }}>
            <body className={inter.className} style={{ height: '100%' }}>
                <SessionProviderWrapper>
                    <SessionHandler>
                        {children}
                    </SessionHandler>
                </SessionProviderWrapper>
            </body>
        </html>
    );
}
