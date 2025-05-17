import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from './_Header';
import { ThemeProvider } from '@/app/[locale]/__theme-provider';
import { LanguageProvider } from '@/app/[locale]/__language-provider';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export async function generateMetadata({
	params,
}: {
	params: { locale: string };
}): Promise<Metadata> {
	return {
		title: {
			default: 'Rioze',
			template: '%s | Rioze',
		},
		description: 'My personal website. A place to share my thoughts and projects.',
		keywords: ['Next.js', 'React', 'JavaScript', 'Blog'],
		authors: [{ name: 'Rioze' }],
		creator: 'Rioze',
		openGraph: {
			type: 'article',
			locale: (await params).locale,
			url: 'https://rioze.dev',
			title: 'Rioze',
			description: 'My personal website. A place to share my thoughts and projects.',
			siteName: 'Rioze',
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Rioze',
			description: 'My personal website. A place to share my thoughts and projects.',
			creator: '@rioze_',
		},
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
			<body className="antialiased">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<LanguageProvider>
						<Header />
						<main className="pt-16">{children}</main>
					</LanguageProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
