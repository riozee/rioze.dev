'use client';

import { useCallback } from 'react';
import { useParams } from 'next/navigation';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LocaleType } from '@/languages';

type TR = {
	[locale in LocaleType]: {
		[section: string]: {
			[key: string]: string | Record<string, string>;
		};
	};
};

/**
 * Custom hook to retrieve translations based on the current locale and section.
 *
 * @param tr - Translation object containing translations for different locales and sections.
 * @param section - The section of the translation object to use.
 * @param overrideLocale - Optional locale to override the default locale.
 * @return An object containing the translation function `t` and the current locale.
 */
export function useT(tr?: TR, section?: string, overrideLocale?: LocaleType) {
	const params = useParams();

	// Get locale from route param (which is handled by Next.js i18n with the [locale] segment)
	const routeLocale = params?.locale as string;

	// Use route locale if available, otherwise fall back to override locale or default
	const locale = (overrideLocale ||
		(routeLocale && SUPPORTED_LOCALES.includes(routeLocale)
			? routeLocale
			: DEFAULT_LOCALE)) as LocaleType;

	const t = useCallback(
		(key: string) => {
			try {
				// If no translation object is provided, return the key itself
				if (!tr) {
					console.warn('No translation object provided');
					return key;
				}
				// If no section is provided, return the key itself
				if (!section) {
					console.warn('No section provided');
					return key;
				}
				// Check if the translation object and pagename exist
				if (!tr[locale] || !tr[locale][section]) {
					console.warn(`Translation not found for locale "${locale}" and section "${section}"`);
					return key;
				}

				// Split key by dots (e.g., 'header.siteName' => ['header', 'siteName'])
				const keys = key.split('.');

				// Start with the pagename section
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				let result: Record<string, any> | string = tr[locale][section];

				// Navigate through the keys
				for (const k of keys) {
					if (result && typeof result === 'object' && k in result) {
						result = result[k];
					} else {
						console.warn(`Translation key not found: ${section}.${key} (locale: ${locale})`);
						return key; // Return the key itself if translation not found
					}
				}

				// Ensure we return a string for React to render
				return typeof result === 'string' ? result : JSON.stringify(result);
			} catch (error) {
				console.error(`Error retrieving translation for ${section}.${key}:`, error);
				return key;
			}
		},
		[locale, tr, section]
	);

	return { t, locale };
}
