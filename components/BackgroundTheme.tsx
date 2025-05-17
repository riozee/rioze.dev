import React, { ReactNode } from 'react';

interface BackgroundThemeProps {
	children: ReactNode;
}

export default function BackgroundTheme({ children }: BackgroundThemeProps) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#058ed9aa] via-white to-[#8af3ffaa] dark:from-[#058ed9aa] dark:via-black dark:to-[#8af3ffaa]">
			{children}
		</div>
	);
}
