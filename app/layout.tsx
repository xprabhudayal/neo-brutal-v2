import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import ClientLayout from '../components/ClientLayout';

// Font for headings
const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

// Font for body/code
const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-space-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'PRABHUDAYAL VAISHNAV // DEV',
        template: '%s // PRABHUDAYAL VAISHNAV',
    },
    description: 'AI Engineer & Full-Stack Developer building intelligent systems.',
    keywords: ['AI Engineer', 'Full Stack Developer', 'React', 'Next.js', 'Typescript', 'Prabhudayal Vaishnav'],
    authors: [{ name: 'Prabhudayal Vaishnav' }],
    creator: 'Prabhudayal Vaishnav',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://prabhudayal.com',
        title: 'PRABHUDAYAL VAISHNAV // DEV',
        description: 'AI Engineer & Full-Stack Developer building intelligent systems.',
        siteName: 'Prabhudayal Vaishnav Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PRABHUDAYAL VAISHNAV // DEV',
        description: 'AI Engineer & Full-Stack Developer building intelligent systems.',
        creator: '@prabhudayal_ai',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-display bg-neo-bg text-neo-text`}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
