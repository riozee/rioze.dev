'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { tr } from './tr';
import { getCookie, setCookie } from 'cookies-next';
import { LocaleType, SUPPORTED_LOCALES, DEFAULT_LOCALE } from './__i18n-shared';

export function useTranslation(initialLocale?: LocaleType) {
	const searchParams = useSearchParams();
	// Use the server-provided locale as initial state if available
	const [locale, setLocale] = useState<LocaleType>(
		initialLocale || (getCookie('NEXT_LOCALE')?.toString() as LocaleType) || DEFAULT_LOCALE
	);

	useEffect(() => {
		// Only handle URL parameter changes after initial load
		const langParam = searchParams.get('lang');
		if (langParam && SUPPORTED_LOCALES.includes(langParam)) {
			setLocale(langParam as LocaleType);
			setCookie('NEXT_LOCALE', langParam, { maxAge: 365 * 24 * 60 * 60 });
		}
	}, [searchParams]);

	const t = useCallback(
		(key: string) => {
			// Split key by dots (e.g., 'header.siteName' => ['header', 'siteName'])
			const keys = key.split('.');

			// Navigate through the translation object based on the keys
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let result: Record<string, any> | string = tr[locale];
			for (const k of keys) {
				if (result && typeof result === 'object' && k in result) {
					result = result[k];
				} else {
					console.warn(`Translation key not found: ${key}`);
					return key; // Return the key itself if translation not found
				}
			}

			// Handle special cases like {year} replacement
			if (typeof result === 'string' && result.includes('{year}')) {
				result = result.replace('{year}', new Date().getFullYear().toString());
			}

			// Ensure we return a string for React to render
			return typeof result === 'string' ? result : JSON.stringify(result);
		},
		[locale]
	);

	return { t, locale };
}
