import { fetchShortendURLAction } from "@/actions";
import type { ShortendURL } from "@/types";
import { AxiosError } from "axios";
import { useEffect, useState, useTransition, type FC } from "react";
import { toast } from "sonner";
import ShortenerForm from "./ShortenerForm";
import type { CreateSchema } from "@/schema";
import type z from "zod";

interface IProps {
	param: string;
	handleSubmit: (data: z.infer<typeof CreateSchema>) => void;
	isProcessing: boolean;
}

const EditURL: FC<IProps> = ({ param, handleSubmit, isProcessing }) => {
	const [isFetching, fetchTransition] = useTransition();
	const [data, setData] = useState<ShortendURL | null>(null);
	useEffect(() => {
		fetchTransition(async () => {
			try {
				if (param) {
					const response = await fetchShortendURLAction(param);
					if (response) {
						setData(response);
					}
				} else {
					toast.error("Url is not valid!");
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					toast.error(error.response?.data.message || error.message);
				} else {
					toast.error("Something went wrong please try again");
				}
			}
		});
	}, [param]);

	console.log(data);

	return (
		!isFetching &&
		data && (
			<ShortenerForm
				handleSubmit={handleSubmit}
				isProcessing={isProcessing}
				isEdit={true}
				data={data}
			/>
		)
	);
};

export default EditURL;
