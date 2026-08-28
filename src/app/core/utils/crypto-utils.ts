import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';

export function generateSha256Hash(plaintextPassword: string): string {
	const encoder: TextEncoder = new TextEncoder();
	const passwordBytes: Uint8Array = encoder.encode(plaintextPassword);
	const hashBytes = sha256(passwordBytes);
	return bytesToHex(hashBytes);
}
