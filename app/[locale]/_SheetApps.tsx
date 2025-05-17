import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Box } from 'lucide-react';

export function SheetApps() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
					<Box className="h-5 w-5" />
					<span className="sr-only">Apps</span>
				</button>
			</SheetTrigger>
			<SheetContent side="top" className="h-[70%]">
				<SheetHeader>
					<SheetTitle>Apps</SheetTitle>
					<SheetDescription>Explore available applications</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
