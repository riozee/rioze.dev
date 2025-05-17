import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Box } from 'lucide-react';
import Link from 'next/link';
import { useT } from './__i18n-hook';
import { tr } from './tr';
import { tr as trApps } from '@/app/[locale]/apps/tr';
import { appsList } from './apps/appsList';

export function SheetApps() {
	const { t } = useT(tr, 'sheetApps');
	const { t: tApps } = useT(trApps, 'page');

	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
					<Box className="h-5 w-5" />
					<span className="sr-only">{t('title')}</span>
				</button>
			</SheetTrigger>
			<SheetContent side="top" className="h-[70%] overflow-y-auto gap-0">
				<SheetHeader>
					<SheetTitle className="hover:underline">
						<Link href="/apps" className="cursor-pointer">
							{t('title')}
						</Link>
					</SheetTitle>
				</SheetHeader>

				<div className="mt-0 p-6 overflow-hidden">
					<ScrollArea className="h-full">
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{appsList.map(app => (
								<Link
									key={app.name}
									href={app.href}
									className="flex flex-row items-center p-4 hover:shadow-md transition-all border-dashed border"
								>
									<div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 mr-4 flex-shrink-0">
										{app.icon}
									</div>
									<div>
										<h3 className="font-medium font-mono">{app.name}</h3>
										<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
											{tApps('apps.' + app.name)}
										</p>
									</div>
								</Link>
							))}
						</div>
					</ScrollArea>
				</div>
			</SheetContent>
		</Sheet>
	);
}
