'use client';

import { useState, useEffect } from 'react';
import { SheetNavigation } from './_SheetNavigation';
import { SheetApps } from './_SheetApps';
import { SheetBlog } from './_SheetBlog';
import { ThemeToggle } from '@/app/__theme-provider';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from './__i18n-hook';
import { LanguageSwitcher } from './__language-provider';

function useScrollDirection() {
	const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const threshold = 10;
		let lastScrollY = window.scrollY;
		let ticking = false;

		const updateScrollDirection = () => {
			const scrollY = window.scrollY;

			if (Math.abs(scrollY - lastScrollY) < threshold) {
				ticking = false;
				return;
			}

			const direction = scrollY > lastScrollY ? 'down' : 'up';
			setScrollDirection(direction);
			setVisible(direction === 'up' || scrollY === 0);

			lastScrollY = scrollY > 0 ? scrollY : 0;
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(updateScrollDirection);
				ticking = true;
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return { scrollDirection, visible };
}

export function Header() {
	const { visible } = useScrollDirection();
	const { t, locale } = useTranslation();

	return (
		<header
			className={`fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 
      backdrop-blur-sm bg-white/75 dark:bg-gray-900/75 z-50 border-b transition-transform duration-300
      ${visible ? 'translate-y-0' : '-translate-y-full'}`}
		>
			{/* Left side - Menu button and Logo */}
			<div className="flex items-center gap-4">
				<SheetNavigation />
				<div className="font-bold text-xl">{t('header.siteName')}</div>
			</div>

			{/* Right side - Language switcher, Theme toggle and two buttons with sheets */}
			<div className="flex items-center gap-2">
				{/* Language switcher */}
				<LanguageSwitcher initialLocale={locale} />

				<Separator orientation="vertical" className="data-[orientation=vertical]:h-8" />

				{/* Theme toggle button */}
				<ThemeToggle />

				<Separator orientation="vertical" className="data-[orientation=vertical]:h-8" />

				{/* apps list sheet*/}
				<SheetApps />

				{/* blog posts sheet */}
				<SheetBlog />
			</div>
		</header>
	);
}
