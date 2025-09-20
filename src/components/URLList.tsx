import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { fetchShortenURLsAction } from "@/actions";
import { Skeleton } from "./ui/skeleton";
import type { ShortendURL } from "@/types";
import URLTableRow from "./URLTableRow";
import { TablePagination } from "./TablePagination";

const URLList = () => {
	const [pageNumber, setPageNumber] = useState<number>(1);

	const [farword, setFarword] = useState<boolean>(true);
	const cursor = useRef<string>("");
	const [isLoading, startTransition] = useTransition();
	const [shortendURLs, setShortendURLs] = useState<ShortendURL[]>([]);
	const limit = 10;

	useEffect(() => {
		startTransition(async () => {
			try {
				const response = await fetchShortenURLsAction({
					page: pageNumber,
					cursor: cursor.current,
					farword,
					limit,
				});
				if (response) {
					setShortendURLs([...response.data]);
					cursor.current = response.cursor ?? "";
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
	}, [pageNumber, cursor, farword]);

	const deleteURL = (shortCode: string) => {
		setShortendURLs((prev) => [
			...prev.filter((_url) => _url.shortCode !== shortCode),
		]);
	};
	const updatePageNumber = (page: number) => {
		setPageNumber(page);
		setFarword(page > pageNumber);
	};
	return (
		<div className="flex flex-col">
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
					{shortendURLs.length > 0 ? (
						shortendURLs.map((shortendURL, index) => {
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
			<TablePagination
				pageNumber={pageNumber}
				updatePageNumber={updatePageNumber}
				isNextPossible={shortendURLs.length === limit}
				isPrevPossible={pageNumber > 1}
			/>
		</div>
	);
};

export default URLList;
