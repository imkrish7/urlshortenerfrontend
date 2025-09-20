import { client } from "@/api";
import type { CreateSchema } from "@/schema";
import type {
	AllURLResponse,
	Filter,
	IAvailabilityCheckResponse,
	ShortendURL,
	ValidateOwnerResponse,
} from "@/types";
import type z from "zod";

export const checkAvailabilityAction = async (
	code: string
): Promise<IAvailabilityCheckResponse> => {
	const url = `/availability/${code}`;
	const result = await client.get(url);
	return result.data;
};

export const createShortenURLAction = async (
	data: z.infer<typeof CreateSchema>
) => {
	const url = "/create";
	const result = await client.post(url, {
		...data,
	});
	return result.data;
};

export const fetchShortenURLsAction = async ({
	page = 1,
	cursor,
	farword = true,
	limit = 10,
}: Filter): Promise<AllURLResponse> => {
	const url = "/all";
	const query = new URLSearchParams();
	query.append("page", page.toString());
	query.append("limit", limit.toString());
	query.append("cursor", cursor);
	query.append("isFarword", farword.toString());
	const response = await client.get(`${url}?${query.toString()}`);
	return response.data;
};

export const fetchShortendURLAction = async (
	shortendCode: string
): Promise<ShortendURL> => {
	const url = `/${shortendCode}`;
	const response = await client.get(url);
	return response.data.data;
};

export const validateOwnerAction = async (
	shortcode: string,
	secret: string
): Promise<ValidateOwnerResponse> => {
	const url = `/validate/${shortcode}/owner`;
	const response = await client.post(url, {
		secret,
	});
	return response.data;
};

export const deleteURLAction = async (
	shortcode: string
): Promise<ValidateOwnerResponse> => {
	const url = `/${shortcode}`;
	const response = await client.delete(url);
	return response.data;
};

export const updateShortenURLAction = async (
	code: string,
	data: z.infer<typeof CreateSchema>
) => {
	const url = `/${code}`;
	const result = await client.put(url, {
		...data,
	});
	return result.data;
};
