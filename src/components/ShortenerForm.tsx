import { CreateSchema } from "@/schema";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState, useTransition, type FC } from "react";
import { checkAvailabilityAction } from "@/actions";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { ShortendURL } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";

interface IProps {
	handleSubmit: (data: z.infer<typeof CreateSchema>) => void;
	isProcessing: boolean;
	isEdit: boolean;
	data: ShortendURL | null;
}

const ShortenerForm: FC<IProps> = ({
	handleSubmit,
	isProcessing,
	isEdit,
	data,
}) => {
	console.log(data);
	const [isLoading, startTransition] = useTransition();
	const [isCodeAvailable, setIsCodeAvaialble] = useState<null | boolean>(
		null
	);
	const form = useForm({
		resolver: zodResolver(CreateSchema),
		mode: "onChange",
		defaultValues: {
			url: data ? data.originalURL : "",
			email: data ? data.ownerEmail : "",
			customCode: data ? data.shortCode : undefined,
			secret: data ? data.secret : "",
		},
	});

	const code = form.watch("customCode");

	const checkAvailability = () => {
		startTransition(async () => {
			try {
				if (code?.length == 10) {
					const response = await checkAvailabilityAction(code);
					setIsCodeAvaialble(response.isAvailable);
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					toast.error(error.response?.data.message || error.message);
				} else {
					toast.error("Something went wrong please try again!");
				}
			}
		});
	};

	useEffect(() => {
		if (code) {
			setIsCodeAvaialble(null);
		}
	}, [code]);
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<div className="space-y-12">
					<div className="border-b border-white/10">
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
							<div className="sm:col-span-3">
								<FormField
									control={form.control}
									name="url"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Original URL</FormLabel>
											<FormControl>
												<Input
													type="url"
													required
													placeholder="example.com"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This is your public display URL.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="sm:col-span-4 flex items-center gap-2">
								<FormField
									control={form.control}
									name="customCode"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Custom URL</FormLabel>
											<div className="flex gap-2">
												<FormControl>
													<Input
														disabled={isEdit}
														placeholder="IRFa-VaY2b"
														{...field}
													/>
												</FormControl>
												<Button
													onClick={checkAvailability}
													type="button"
													disabled={isLoading}
												>
													{isLoading
														? "checking...."
														: "Check Availability"}
												</Button>
											</div>

											<FormDescription>
												This is your custom url.
											</FormDescription>
											<FormMessage>
												{isCodeAvailable !== null &&
													(isCodeAvailable ? (
														<p className="text-green-400">
															Code is avaialble
														</p>
													) : (
														<p className="text-red-400">
															Code is not
															avaialble try
															something else
														</p>
													))}
											</FormMessage>
										</FormItem>
									)}
								/>
							</div>

							<div className="sm:col-span-3">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="shadcn"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Owner of the URL.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="sm:col-span-2">
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
												This is for modification of
												created record.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-6 flex items-center justify-end gap-x-6">
					<Button
						type="submit"
						className="rounded-md px-3 py-2 text-sm font-semibold text-white"
						disabled={isProcessing}
					>
						{isProcessing
							? isEdit
								? "Editing..."
								: "Creating..."
							: "Save"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default ShortenerForm;
