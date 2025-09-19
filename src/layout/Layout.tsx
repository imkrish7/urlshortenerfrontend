import { AppSidebar } from "./app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function Layout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
					<h1 className="scroll-m-20 text-3xl font-bold tracking-tight text-balance">
						Shortener
					</h1>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
