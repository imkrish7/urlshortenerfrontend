"use client";
import { ChartSpline, Command, HomeIcon } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

const navigation = [
	{
		path: "/",
		icon: HomeIcon,
		title: "Dashboard",
	},
	{
		path: "/analysis",
		icon: ChartSpline,
		title: "Analysis",
	},
];

export function AppSidebar() {
	return (
		<Sidebar
			collapsible="none"
			className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r h-[100vh] overflow-hidden"
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							asChild
							className="md:h-8 md:p-0"
						>
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										Acme Inc
									</span>
									<span className="truncate text-xs">
										Enterprise
									</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent className="px-1.5 md:px-0">
						<SidebarMenu>
							{navigation.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={{
											children: item.title,
											hidden: false,
										}}
										className="px-2.5 md:px-2"
									>
										<Link to={item.path}>
											<item.icon />
											{/* <span>{item.title}</span> */}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
