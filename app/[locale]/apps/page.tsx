'use client';

import Link from 'next/link';
import { BookOpenText } from 'lucide-react';
import { useT } from '../__i18n-hook';
import { tr } from './tr';

export type AppItem = {
	name: string;
	icon: React.ReactNode;
	href: string;
};

export const apps: AppItem[] = [
	{
		name: 'lang-assist',
		icon: <BookOpenText className="h-6 w-6" />,
		href: '/apps/lang-assist',
	},
];

export default function AppsPage() {
	const { t } = useT(tr, 'page');
	return (
		<div className="container p-8">
			<h1 className="text-3xl font-bold mb-6">Applications</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{apps.map(app => (
					<Link
						key={app.name}
						href={app.href}
						className="flex flex-row items-center p-4 hover:shadow-md transition-all border rounded-lg"
					>
						<div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 mr-4 flex-shrink-0">
							{app.icon}
						</div>
						<div>
							<h3 className="font-medium font-mono">{app.name}</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
								{t('apps.' + app.name)}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
