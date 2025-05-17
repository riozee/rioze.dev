import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './languages';

// Get the preferred locale, similar to the getLocale function in __i18n-server.ts
function getPreferredLocale(request: NextRequest) {
	// Check cookie first
	const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
	if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
		return cookieLocale;
	}

	// Check Accept-Language header
	const acceptLanguage = request.headers.get('Accept-Language') || '';
	const browserLang = acceptLanguage.split(',')[0].split('-')[0];
	if (SUPPORTED_LOCALES.includes(browserLang)) {
		return browserLang;
	}

	// Default locale
	return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Check if the pathname already has a locale
	const pathnameHasLocale = SUPPORTED_LOCALES.some(
		locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);

	if (pathnameHasLocale) return NextResponse.next();

	// Redirect if there is no locale
	const locale = getPreferredLocale(request);

	// Always add locale to URL for consistency, even for default locale
	const newUrl = new URL(`/${locale}${pathname}`, request.url);

	// Copy all search params
	request.nextUrl.searchParams.forEach((value, key) => {
		newUrl.searchParams.set(key, value);
	});

	return NextResponse.redirect(newUrl);
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		'/((?!_next|api|favicon.ico|.*\\.).*)',
	],
};
