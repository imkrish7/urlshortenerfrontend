import { updateShortenURLAction } from "@/actions";
import EditURL from "@/components/EditURL";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ValidateOwner } from "@/components/ValidateUser";
import type { CreateSchema } from "@/schema";
import { AxiosError } from "axios";
import { useState, useTransition } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type z from "zod";

const Edit = () => {
	const params = useParams();

	const [isLoading, startTransition] = useTransition();

	const [isUserValidated, setIsUserValidated] = useState<boolean>(false);
	const router = useNavigate();

	const handleSubmit = (data: z.infer<typeof CreateSchema>) => {
		startTransition(async () => {
			try {
				const response = await updateShortenURLAction(
					data.customCode!,
					data
				);
				if (response) {
					toast.success("Url updated!");
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
	if (!isUserValidated) {
		return (
			<ValidateOwner
				param={params["shorturl"]!}
				setValidation={setIsUserValidated}
			/>
		);
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle> Edit Shortend URL</CardTitle>
			</CardHeader>
			<CardContent>
				<EditURL
					handleSubmit={handleSubmit}
					isProcessing={isLoading}
					param={params["shorturl"]!}
				/>
			</CardContent>
		</Card>
	);
};

export default Edit;
