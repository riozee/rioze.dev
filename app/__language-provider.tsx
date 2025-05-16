'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { setCookie } from 'cookies-next';
import { useTranslation } from './__i18n-hook';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LocaleType } from './__i18n-shared';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const { locale } = useTranslation();

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
	const searchParams = useSearchParams();

	// Check URL parameter first, then fall back to initialLocale
	const langParam = searchParams.get('lang');
	const initialLang =
		langParam && SUPPORTED_LOCALES.includes(langParam) ? (langParam as LocaleType) : initialLocale;

	const [language, setLanguage] = useState<LocaleType>(initialLang);

	useEffect(() => {
		// Handle URL parameter changes after initial load
		const langParam = searchParams.get('lang');
		if (langParam && SUPPORTED_LOCALES.includes(langParam)) {
			setLanguage(langParam as LocaleType);
		}
	}, [searchParams]);

	const handleLanguageChange = (value: string) => {
		if (value && SUPPORTED_LOCALES.includes(value)) {
			// Set cookie for immediate effect
			setCookie('NEXT_LOCALE', value, { maxAge: 365 * 24 * 60 * 60 });

			// Update URL parameter (which will trigger our useEffect)
			const url = new URL(window.location.href);
			url.searchParams.set('lang', value);
			router.replace(url.toString());

			// Update local state (though useEffect will also do this)
			setLanguage(value as LocaleType);
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
