import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { fetchShortenURLsAction } from "@/actions";
import { Skeleton } from "./ui/skeleton";
import type { ShortendURL } from "@/types";
import URLTableRow from "./URLTableRow";

const URLList = () => {
	const [isLoading, startTransition] = useTransition();
	const [shortendURL, setShortendURL] = useState<ShortendURL[]>([]);
	useEffect(() => {
		startTransition(async () => {
			try {
				const response = await fetchShortenURLsAction();
				if (response) {
					setShortendURL([...response]);
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
	}, []);

	const deleteURL = (shortCode: string) => {
		setShortendURL((prev) => [
			...prev.filter((_url) => _url.shortCode !== shortCode),
		]);
	};
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Owner</TableHead>
					<TableHead>Original URL</TableHead>
					<TableHead>Shorten URL</TableHead>
					<TableHead>View Count</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{shortendURL.length > 0 ? (
					shortendURL.map((shortendURL, index) => {
						return (
							<URLTableRow
								shortendURL={shortendURL}
								key={index}
								deleteURL={deleteURL}
							/>
						);
					})
				) : (
					<TableRow>
						<TableCell colSpan={4}>
							<p className="text-center p-2 text-lg text-semibold">
								No Data avaialble
							</p>
						</TableCell>
					</TableRow>
				)}
				{isLoading && (
					<TableRow>
						<TableCell colSpan={4}>
							<Skeleton />
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default URLList;
