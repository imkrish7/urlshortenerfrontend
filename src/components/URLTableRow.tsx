import type { ShortendURL } from "@/types";
import type { FC } from "react";
import { TableCell, TableRow } from "./ui/table";
import { TableActionColumns } from "./TableActionColumns";

interface IProps {
	shortendURL: ShortendURL;
	deleteURL: (shortCode: string) => void;
}

const URLTableRow: FC<IProps> = ({ shortendURL, deleteURL }) => {
	return (
		<TableRow>
			<TableCell>{shortendURL.ownerEmail}</TableCell>
			<TableCell>{shortendURL.originalURL}</TableCell>
			<TableCell>
				<a
					href={shortendURL.shortenURL}
					target="__blank"
					className="px-2 py-1 rounded-md text-blue-400 font-semibold text-center"
				>
					View
				</a>
			</TableCell>
			<TableCell>{shortendURL.clicks ?? 0}</TableCell>
			<TableActionColumns deleteURL={deleteURL} colData={shortendURL} />
		</TableRow>
	);
};

export default URLTableRow;
