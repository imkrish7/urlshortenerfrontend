import { createShortenURLAction } from "@/actions";
import ShortenerForm from "@/components/ShortenerForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CreateSchema } from "@/schema";
import { AxiosError } from "axios";
import { useTransition } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

const Create = () => {
	const [isLoading, startTransition] = useTransition();
	const router = useNavigate();
	const handleSubmit = (data: z.infer<typeof CreateSchema>) => {
		startTransition(async () => {
			try {
				const response = await createShortenURLAction(data);
				if (response) {
					toast.success("Url created!");
					router("/");
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					toast.error(error.response?.data.message || error.message);
				} else {
					toast.error("Something went wrong please try again");
				}
			}
		});
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle>Create Shortend URL</CardTitle>
			</CardHeader>
			<CardContent>
				<ShortenerForm
					handleSubmit={handleSubmit}
					isProcessing={isLoading}
					isEdit={false}
					data={null}
				/>
			</CardContent>
		</Card>
	);
};

export default Create;
