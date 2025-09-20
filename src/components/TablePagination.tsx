import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import type { FC } from "react";
import { toast } from "sonner";

interface IProps {
	pageNumber: number;
	updatePageNumber: (pageNumber: number) => void;
	isNextPossible: boolean;
	isPrevPossible: boolean;
}

export const TablePagination: FC<IProps> = ({
	pageNumber,
	updatePageNumber,
	isPrevPossible,
	isNextPossible,
}) => {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className="cursor-pointer"
						onClick={() => {
							if (isPrevPossible) {
								updatePageNumber(pageNumber - 1);
							} else {
								toast.warning("You are on page 1");
							}
						}}
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink>{pageNumber}</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						className="cursor-pointer"
						onClick={() => {
							if (isNextPossible) {
								updatePageNumber(pageNumber + 1);
							} else {
								toast.warning("No more data");
							}
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
