'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

function Separator({
	className,
	orientation = 'horizontal',
	decorative = true,
	...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
	return (
		<SeparatorPrimitive.Root
			data-slot="separator-root"
			decorative={decorative}
			orientation={orientation}
			className={cn(
				'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
				className
			)}
			{...props}
		/>
	);
}

const BORDER_COLOR = 'border-[#058ed9] dark:border-[#8af3ff]';

function DashedSeparator({
	className,
	orientation = 'horizontal',
	decorative = true,
	...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
	return (
		<SeparatorPrimitive.Root
			data-slot="separator-root"
			decorative={decorative}
			orientation={orientation}
			className={cn(
				'shrink-0',
				orientation === 'horizontal'
					? 'h-px w-full border-t border-dashed ' + BORDER_COLOR
					: 'h-full w-px border-l border-dashed ' + BORDER_COLOR,
				className
			)}
			{...props}
		/>
	);
}

export { Separator, DashedSeparator, BORDER_COLOR };
