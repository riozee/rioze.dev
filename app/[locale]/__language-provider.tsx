'use client';

import * as React from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { setCookie } from 'cookies-next';
import { useT } from './__i18n-hook';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LocaleType } from '@/languages';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const { locale } = useT();

	// Set the HTML lang attribute whenever language changes
	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	return <>{children}</>;
}

export function LanguageSwitcher({
	initialLocale = DEFAULT_LOCALE,
}: {
	initialLocale?: LocaleType;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();

	// Get current locale from route parameters
	const currentLocale = (params?.locale || initialLocale) as LocaleType;
	const [language, setLanguage] = useState<LocaleType>(currentLocale);

	// Extract the path without the locale prefix to use when switching locales
	const getPathWithoutLocale = () => {
		const segments = pathname.split('/');
		// Remove first segment (empty) and second segment (locale)
		segments.splice(0, 2);
		return '/' + segments.join('/');
	};

	const handleLanguageChange = (value: string) => {
		if (value && SUPPORTED_LOCALES.includes(value)) {
			setLanguage(value as LocaleType);

			// Set cookie for consistency with Next.js
			setCookie('NEXT_LOCALE', value, { maxAge: 365 * 24 * 60 * 60 });

			// Always navigate to the URL with the locale prefix for consistency with middleware
			router.push(`/${value}${getPathWithoutLocale()}`);
		}
	};

	return (
		<ToggleGroup
			type="single"
			value={language}
			onValueChange={handleLanguageChange}
			className="border rounded-md"
			variant="outline"
		>
			<ToggleGroupItem value="id" className="px-2 text-xs sm:px-3">
				ID
			</ToggleGroupItem>
			<ToggleGroupItem value="en" className="px-2 text-xs sm:px-3">
				EN
			</ToggleGroupItem>
			<ToggleGroupItem value="ja" className="px-2 text-xs sm:px-3">
				JA
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
