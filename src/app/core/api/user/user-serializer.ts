import { localDateTimeToString } from '@core/utils/data-type-utils';
import { LocalDateTime } from '@js-joda/core';
import { User } from './model/user';
import { dateTimeFormatter, UserDto } from './dto/user-dto';
import { UnsupportedOperationError } from '@core/utils/common-errors';

export class UserSerializer {
	constructor() {
		throw new UnsupportedOperationError();
	}

	public static serialize(user: User): string {
		const middleNames: readonly string[] | undefined = user.getMiddleNames();
		const lastChange: LocalDateTime | undefined = user.getLastChange();

		const userDto: UserDto = {
			id: user.getId()?.toString(),
			username: user.getUsername(),
			firstName: user.getFirstName(),
			middleNames: middleNames ? [...middleNames] : undefined,
			lastName: user.getLastName(),
			email: user.getEmail(),
			userType: user.getUserType().id,
			passwordHash: user.getPasswordHash(),
			lastChange: lastChange ? localDateTimeToString(lastChange, dateTimeFormatter) : undefined,
			lastChangedBy: user.getLastChangedBy()?.toString(),
			version: user.getVersion()?.toString()
		};

		// TODO The replacer argument has a "this:any" parameter. Research how this works. It looks very mysterious / magical.
		return JSON.stringify(userDto);
	}
}
