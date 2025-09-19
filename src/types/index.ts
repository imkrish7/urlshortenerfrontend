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

export interface ValidateOwnerResponse {
	message: string;
}
