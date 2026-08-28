// Using the "?" allows the property key to be missing. "undefined" would enforce it with an empty value.
export interface LoginRequestDto {
	username: string;
	passwordHash: string;
	clientType: string;
}
