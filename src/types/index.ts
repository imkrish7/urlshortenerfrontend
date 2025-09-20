export interface IAvailabilityCheckResponse {
	isAvailable: boolean;
}

export interface ShortendURL {
	originalURL: string;
	shortCode: string;
	shortenURL: string;
	ownerEmail: string;
	secret?: string;
	clicks?: string;
}

export interface AllURLResponse {
	data: ShortendURL[];
	cursor?: string;
}

export interface Filter {
	page: number;
	cursor: string;
	farword: boolean;
	limit: number;
}

export interface ValidateOwnerResponse {
	message: string;
}
