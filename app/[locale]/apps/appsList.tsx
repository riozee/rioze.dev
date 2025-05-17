import { BookOpenText } from 'lucide-react';

export type AppItem = {
	name: string;
	icon: React.ReactNode;
	href: string;
};

export const appsList: AppItem[] = [
	{
		name: 'lang-assist',
		icon: <BookOpenText className="h-6 w-6" />,
		href: '/apps/lang-assist',
	},
];
