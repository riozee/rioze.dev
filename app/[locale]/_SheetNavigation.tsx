import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetFooter,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useT } from './__i18n-hook';
import { tr } from './tr';

function SheetContents() {
	const { t } = useT(tr, 'sheetNavigation');
	const currentYear = new Date().getFullYear();

	return (
		<>
			<SheetHeader>
				<SheetTitle>{t('title')}</SheetTitle>
				<SheetDescription>{t('description')}</SheetDescription>
			</SheetHeader>

			<div className="flex-grow overflow-hidden">
				<ScrollArea className="h-full my-4 pl-4">
					<div className="flex flex-col space-y-4 pr-4">
						<div className="space-y-2">
							<h3 className="text-sm font-medium">{t('main')}</h3>
							<div className="flex flex-col space-y-2 text-sm">
								<Link href="/" className="hover:underline">
									{t('home')}
								</Link>
								<Link href="/about" className="hover:underline">
									{t('about')}
								</Link>
								<Link href="/blog" className="hover:underline">
									{t('blog')}
								</Link>
								<Link href="/projects" className="hover:underline">
									{t('projects')}
								</Link>
							</div>
						</div>

						<Separator />

						<div className="space-y-2">
							<h3 className="text-sm font-medium">{t('resources')}</h3>
							<div className="flex flex-col space-y-2 text-sm">
								<Link href="/docs" className="hover:underline">
									{t('documentation')}
								</Link>
								<Link href="/guides" className="hover:underline">
									{t('guides')}
								</Link>
								<Link href="/tutorials" className="hover:underline">
									{t('tutorials')}
								</Link>
							</div>
						</div>

						<Separator />

						<div className="space-y-2">
							<h3 className="text-sm font-medium">{t('legal')}</h3>
							<div className="flex flex-col space-y-2 text-sm">
								<Link href="/terms" className="hover:underline">
									{t('termsOfService')}
								</Link>
								<Link href="/privacy" className="hover:underline">
									{t('privacyPolicy')}
								</Link>
								<Link href="/cookies" className="hover:underline">
									{t('cookiePolicy')}
								</Link>
							</div>
						</div>

						<Separator />

						<div className="space-y-2">
							<h3 className="text-sm font-medium">{t('connect')}</h3>
							<div className="flex flex-col space-y-2 text-sm">
								<Link href="/contact" className="hover:underline">
									{t('contactUs')}
								</Link>
								<a
									href="https://twitter.com/rioze"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline"
								>
									{t('twitter')}
								</a>
								<a
									href="https://github.com/rioze"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline"
								>
									{t('github')}
								</a>
								<a
									href="https://linkedin.com/in/rioze"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline"
								>
									{t('linkedin')}
								</a>
							</div>
						</div>
					</div>
				</ScrollArea>
			</div>
			<SheetFooter className="mt-auto border-t pt-4">
				<div className="text-sm text-muted-foreground">
					{t('copyright').replace('{year}', currentYear.toString())}
				</div>
			</SheetFooter>
		</>
	);
}

export function SheetNavigation() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Menu</span>
				</button>
			</SheetTrigger>
			<SheetContent side="left" className="flex flex-col h-screen">
				<SheetContents />
			</SheetContent>
		</Sheet>
	);
}
