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
import { useTranslation } from './__i18n-hook';

function SheetContents() {
	const { t } = useTranslation();
	const currentYear = new Date().getFullYear();

	return (
		<>
			<SheetHeader>
				<SheetTitle>{t('sheetNavigation.title')}</SheetTitle>
				<SheetDescription>{t('sheetNavigation.description')}</SheetDescription>
			</SheetHeader>

			<div className="flex-grow overflow-hidden">
				<ScrollArea className="h-full my-4 pl-4">
					<div className="flex flex-col space-y-4 pr-4">
						<div className="space-y-2">
							<h3 className="text-sm font-medium">{t('sheetNavigation.main')}</h3>
							<div className="flex flex-col space-y-2 text-sm">
								<Link href="/" className="hover:underline">
									{t('sheetNavigation.home')}
								</Link>
								<Link href="/about" className="hover:underline">
									{t('sheetNavigation.about')}
								</Link>
								<Link href="/blog" className="hover:underline">
									{t('sheetNavigation.blog')}
								</Link>
								<Link href="/projects" className="hover:underline">
									{t('sheetNavigation.projects')}
								</Link>
							</div>
						</div>

						<Separator />

						<div className="space-y-2">
							<h3 className="text-sm font-medium">{t('sheetNavigation.resources')}</h3>
							<div className="flex flex-col space-y-2 text-sm">
								<Link href="/docs" className="hover:underline">
									{t('sheetNavigation.documentation')}
								</Link>
								<Link href="/guides" className="hover:underline">
									{t('sheetNavigation.guides')}
								</Link>
								<Link href="/tutorials" className="hover:underline">
									{t('sheetNavigation.tutorials')}
								</Link>
							</div>
						</div>

						<Separator />

						<div className="space-y-2">
							<h3 className="text-sm font-medium">{t('sheetNavigation.legal')}</h3>
							<div className="flex flex-col space-y-2 text-sm">
								<Link href="/terms" className="hover:underline">
									{t('sheetNavigation.termsOfService')}
								</Link>
								<Link href="/privacy" className="hover:underline">
									{t('sheetNavigation.privacyPolicy')}
								</Link>
								<Link href="/cookies" className="hover:underline">
									{t('sheetNavigation.cookiePolicy')}
								</Link>
							</div>
						</div>

						<Separator />

						<div className="space-y-2">
							<h3 className="text-sm font-medium">{t('sheetNavigation.connect')}</h3>
							<div className="flex flex-col space-y-2 text-sm">
								<Link href="/contact" className="hover:underline">
									{t('sheetNavigation.contactUs')}
								</Link>
								<a
									href="https://twitter.com/rioze"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline"
								>
									{t('sheetNavigation.twitter')}
								</a>
								<a
									href="https://github.com/rioze"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline"
								>
									{t('sheetNavigation.github')}
								</a>
								<a
									href="https://linkedin.com/in/rioze"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline"
								>
									{t('sheetNavigation.linkedin')}
								</a>
							</div>
						</div>
					</div>
				</ScrollArea>
			</div>
			<SheetFooter className="mt-auto border-t pt-4">
				<div className="text-sm text-muted-foreground">
					{t('sheetNavigation.copyright').replace('{year}', currentYear.toString())}
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
