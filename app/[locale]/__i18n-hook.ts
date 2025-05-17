'use client';

import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { tr } from './tr';
import { setCookie } from 'cookies-next';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LocaleType } from '../../languages';

export function useTranslation(initialLocale?: LocaleType) {
	const params = useParams();

	// Get locale from route param (which is handled by Next.js i18n with the [locale] segment)
	const routeLocale = params?.locale as string;

	// Use route locale if available, otherwise fall back to initial/default
	const [locale, setLocale] = useState<LocaleType>(
		(routeLocale && SUPPORTED_LOCALES.includes(routeLocale)
			? routeLocale
			: initialLocale || DEFAULT_LOCALE) as LocaleType
	);

	// Sync the locale with cookie when it changes
	useEffect(() => {
		if (locale) {
			setCookie('NEXT_LOCALE', locale, { maxAge: 60 * 60 * 24 * 365 }); // 1 year
		}
	}, [locale]);

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

			// Ensure we return a string for React to render
			return typeof result === 'string' ? result : JSON.stringify(result);
		},
		[locale]
	);

	return { t, locale, setLocale };
}
