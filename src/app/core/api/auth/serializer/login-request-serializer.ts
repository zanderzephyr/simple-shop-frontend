import { UnsupportedOperationError } from '@core/utils/common-errors';
import { LoginRequestDto } from '../dto/login-request-dto';
import { LoginRequest } from '../model/login-request';

export class LoginRequestSerializer {
	constructor() {
		throw new UnsupportedOperationError();
	}

	public static serialize(loginRequest: LoginRequest): string {
		const loginRequestDto: LoginRequestDto = {
			username: loginRequest.getUsername(),
			passwordHash: loginRequest.getPasswordHash(),
			clientType: loginRequest.getClientType()
		};

		return JSON.stringify(loginRequestDto);
	}
}
