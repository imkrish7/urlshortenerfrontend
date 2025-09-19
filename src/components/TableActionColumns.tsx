"use client";

import { Button } from "@/components/ui/button";

import { TableCell } from "./ui/table";
import { EllipsisVertical } from "lucide-react";
import type { ShortendURL } from "@/types";
import { useNavigate } from "react-router";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "./ui/dialog";

import { ValidateOwner } from "./ValidateUser";
import { useState, useTransition } from "react";
import { deleteURLAction } from "@/actions";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
interface IProps {
	colData: ShortendURL;
	deleteURL: (shortCode: string) => void;
}
export function TableActionColumns({ colData, deleteURL }: IProps) {
	const [toggleAction, setToggleAction] = useState(false);
	const [toggleDelete, setToggleDelete] = useState(false);
	const [isLoading, startTransition] = useTransition();
	const [isUserValidated, setIsUserValidated] = useState<boolean>(false);
	const router = useNavigate();

	const deleteURLData = () => {
		startTransition(async () => {
			try {
				const response = await deleteURLAction(colData.shortCode);
				if (response) {
					deleteURL(colData.shortCode);
					setToggleDelete(false);
					setToggleAction(false);
					toast.success("Deletion completed");
				} else {
					toast.error("Try Again!");
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
		<TableCell>
			<DropdownMenu
				open={toggleAction}
				onOpenChange={(open) => {
					setToggleAction(open);
				}}
			>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">
						<EllipsisVertical />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-56">
					<DropdownMenu>
						<DropdownMenuItem
							onClick={() => {
								router(`/edit/${colData.shortCode}`);
							}}
						>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								setToggleDelete(true);
							}}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenu>
				</DropdownMenuContent>
			</DropdownMenu>
			{toggleDelete && (
				<Dialog
					open={toggleDelete}
					onOpenChange={(val) => {
						setToggleDelete(val);
					}}
				>
					<DialogContent className="sm:max-w-[425px]">
						{!isUserValidated && (
							<ValidateOwner
								param={colData.shortCode}
								setValidation={setIsUserValidated}
							/>
						)}
						{isUserValidated && (
							<div className="flex items-center">
								<p className="text-xl font-bold">
									Are your sure?
								</p>
							</div>
						)}

						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							{isUserValidated && (
								<Button
									onClick={deleteURLData}
									disabled={isLoading}
								>
									{isLoading ? "Deleting..." : "Delete"}
								</Button>
							)}
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</TableCell>
	);
}
