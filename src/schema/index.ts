import { z } from "zod";

export const CreateSchema = z.object({
	url: z.url().refine(
		(val) => {
			try {
				const u = new URL(val);
				// Require at least one dot in the hostname
				return (
					u.hostname.includes(".") &&
					!u.hostname.endsWith(".") &&
					u.hostname.split(".")[1].length >= 2
				);
			} catch {
				return false;
			}
		},
		{
			message:
				"Invalid URL — must include a valid domain (e.g. example.com)",
		}
	),
	email: z.email(),
	customCode: z.string().length(10).optional(),
	secret: z.string().min(6),
});
