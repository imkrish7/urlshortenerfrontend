"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FC } from "react";

const FormSchema = z.object({
	filter: z.string().refine((val) => {
		if (val.length >= 10) {
			return true;
		}
	}),
});

interface IProps {
	updateFilter: (filerSearch: string) => void;
	clearFilter: () => void;
}

export const FilterByFields: FC<IProps> = ({ updateFilter, clearFilter }) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			filter: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		updateFilter(data.filter);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-2/3 space-y-6 flex items-center gap-2"
			>
				<FormField
					control={form.control}
					name="filter"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Filter</FormLabel>
							<FormControl>
								<Input
									placeholder="Filter by email"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-2">
					<Button type="submit">Filter</Button>
					<Button
						onClick={() => {
							clearFilter();
						}}
						type="button"
						variant={"outline"}
					>
						Clear
					</Button>
				</div>
			</form>
		</Form>
	);
};
