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

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Prabhudayal Vaishnav',
    url: 'https://xpdv.vercel.app',
    sameAs: [
        'https://github.com/prabhudayal', 
        'https://twitter.com/prabhudayal_ai',
        'https://linkedin.com/in/prabhudayal-vaishnav'
    ],
    jobTitle: 'AI Engineer',
    worksFor: {
        '@type': 'Organization',
        name: 'Self-Employed'
    },
    description: 'AI Engineer & Full-Stack Developer building intelligent systems.'
};

export const metadata: Metadata = {
    metadataBase: new URL('https://xpdv.vercel.app'),
    alternates: {
        canonical: '/',
    },
    title: {
        default: 'PRABHUDAYAL VAISHNAV // DEV',
        template: '%s // PRABHUDAYAL VAISHNAV',
    },
    description: 'AI Engineer & Full-Stack Developer building intelligent systems.',
    keywords: ['AI Engineer', 'Full Stack Developer', 'React', 'Next.js', 'Typescript', 'Prabhudayal Vaishnav', 'Voice Agents', 'Computer Vision'],
    authors: [{ name: 'Prabhudayal Vaishnav' }],
    creator: 'Prabhudayal Vaishnav',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://xpdv.vercel.app',
        title: 'PRABHUDAYAL VAISHNAV // DEV',
        description: 'AI Engineer & Full-Stack Developer building intelligent systems.',
        siteName: 'Prabhudayal Vaishnav Portfolio',
        images: [
            {
                url: '/og-image.jpg', // Assuming you'll have an OG image
                width: 1200,
                height: 630,
                alt: 'Prabhudayal Vaishnav - AI Engineer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PRABHUDAYAL VAISHNAV // DEV',
        description: 'AI Engineer & Full-Stack Developer building intelligent systems.',
        creator: '@prabhudayal_ai',
        images: ['/og-image.jpg'],
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
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-display bg-neo-bg text-neo-text`}>
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-neo-primary focus:text-neo-text focus:border-3 focus:border-neo-border focus:font-bold focus:shadow-neo">
                    Skip to main content
                </a>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
