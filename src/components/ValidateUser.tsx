"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	useTransition,
	type Dispatch,
	type FC,
	type SetStateAction,
} from "react";
import { AxiosError } from "axios";
import { validateOwnerAction } from "@/actions";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const FormSchema = z.object({
	secret: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

interface IProps {
	param: string;
	setValidation: Dispatch<SetStateAction<boolean>>;
}

export const ValidateOwner: FC<IProps> = ({ param, setValidation }) => {
	const [isLoading, startTransition] = useTransition();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			secret: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition(async () => {
			try {
				if (param) {
					const response = await validateOwnerAction(
						param,
						data.secret
					);
					if (response) {
						setValidation(true);
					}
				} else {
					toast.error("Url is not valid!");
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					toast.error(error.response?.data.message || error.message);
				} else {
					toast.error(
						"Something went worng! Please refresh the page"
					);
				}
			}
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Validate your self</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-2/3 space-y-6"
					>
						<FormField
							control={form.control}
							name="secret"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Secret</FormLabel>
									<FormControl>
										<Input
											placeholder="shadcn"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Verify that you own this url.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">
							{isLoading ? "Validating..." : "Submit"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
