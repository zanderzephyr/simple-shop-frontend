import { IllegalStateError } from '@core/utils/common-errors';
import { ZodType } from 'zod';
import { CurrentUserDto, zodCurrentUserDto } from '../dto/current-user-dto';

export class CurrentUser {
	readonly #userId?: bigint;

	constructor(userId: bigint | undefined) {
		if (userId !== undefined && userId < 0n) {
			throw new IllegalStateError('Invalid user ID!');
		}

		this.#userId = userId;

		Object.freeze(this);
	}

	public getUserId(): bigint | undefined {
		return this.#userId;
	}
}

export function zodCurrentUser(): ZodType<CurrentUser> {
	return zodCurrentUserDto().transform((dto: CurrentUserDto): CurrentUser => {
		return new CurrentUser(dto.userId !== undefined ? BigInt(dto.userId) : undefined);
	});
}
