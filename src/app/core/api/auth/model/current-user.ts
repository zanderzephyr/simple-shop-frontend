import { InvalidStateError } from '@core/utils/common-errors';
import { ZodType } from 'zod';
import { CurrentUserDto, zodCurrentUserDto } from '../dto/current-user-dto';

export class CurrentUser {
  readonly #userId: bigint;

  constructor(userId: bigint) {
    if (userId < 0n) {
      throw new InvalidStateError('Invalid user ID!');
    }

    this.#userId = userId;

    Object.freeze(this);
  }

  public getUserId(): bigint {
    return this.#userId;
  }
}

export function zodCurrentUser(): ZodType<CurrentUser> {
  return zodCurrentUserDto().transform((dto: CurrentUserDto): CurrentUser => {
    return new CurrentUser(BigInt(dto.userId));
  });
}
