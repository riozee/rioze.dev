import { cookies, headers } from 'next/headers';
import { LocaleType, SUPPORTED_LOCALES, DEFAULT_LOCALE } from './__i18n-shared';

/**
 * Get the current locale from cookies, headers, or default
 * For use in server components and generateMetadata functions
 *
 * @param {Object} options - Options for locale detection
 * @param {string|null} options.langParam - The 'lang' query parameter if available
 */
export async function getLocale(options?: { langParam?: string | null }): Promise<LocaleType> {
	// Check URL query parameter first (if provided)
	if (options?.langParam && SUPPORTED_LOCALES.includes(options.langParam)) {
		return options.langParam as LocaleType;
	}

	// Check cookie
	try {
		const cookieStore = await cookies();
		const localeCookie = cookieStore.get('NEXT_LOCALE');
		if (localeCookie && SUPPORTED_LOCALES.includes(localeCookie.value)) {
			return localeCookie.value as LocaleType;
		}
	} catch (error) {
		console.warn('Error accessing cookies:', error);
	}

	// Check Accept-Language header
	try {
		const headersList = await headers();
		const acceptLanguage = headersList.get('Accept-Language') || '';
		const browserLang = acceptLanguage.split(',')[0].split('-')[0];
		if (SUPPORTED_LOCALES.includes(browserLang)) {
			return browserLang as LocaleType;
		}
	} catch (error) {
		console.warn('Error getting Accept-Language header:', error);
	}

	// Default to DEFAULT_LOCALE
	return DEFAULT_LOCALE;
}
