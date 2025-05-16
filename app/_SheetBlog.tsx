import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { MessageSquareMore } from 'lucide-react';

export function SheetBlog() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
					<MessageSquareMore className="h-5 w-5" />
					<span className="sr-only">Blog posts</span>
				</button>
			</SheetTrigger>
			<SheetContent side="right">
				<SheetHeader>
					<SheetTitle>Blog posts</SheetTitle>
					<SheetDescription>Latest blog posts</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
