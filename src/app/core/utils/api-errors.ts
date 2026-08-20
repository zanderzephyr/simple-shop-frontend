import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseError } from './common-errors';

// TODO Move content to lib

export abstract class ApiError extends BaseError {}

export abstract class AvailabilityError extends ApiError {}

export abstract class DomainError extends ApiError {}

export class InternalServiceError extends AvailabilityError {}

export class ServiceUnavailableError extends AvailabilityError {}

/**
 * Represents the case, in which a developer has to probably fix a request or an endpoint.
 */
export class InvalidRequestError extends AvailabilityError {}

/**
 * Might happen if a session expires and the user clicks on someting behind the session-wall.
 * This should be caught globally and the user has to be redirected to the landing page or
 * something equivalent.
 */
export class UnauthorizedError extends AvailabilityError {}

/**
 * Represents the case of a request without sufficient rights.
 */
export class IllegalRequestError extends DomainError {}

export class ObjectNotFoundError extends DomainError {}

export class DuplicateObjectError extends DomainError {}

/**
 * Constant for some cases of network issues. See https://angular.dev/guide/http/making-requests for details.
 * If I understand correctly, W3C standard defines that.
 */
export const HTTP_STATUS_MAIN_NETWORK_ISSUES: number = 0;

const httpStatusCodeToApiErrorMap: Map<number, (message?: string) => ApiError> = createMap();

function createMap(): Map<number, (message?: string) => ApiError> {
  const map = new Map<number, (message?: string) => ApiError>();

  map.set(
    HTTP_STATUS_MAIN_NETWORK_ISSUES,
    (message?: string) => new ServiceUnavailableError(message),
  );
  map.set(HttpStatusCode.BadRequest, (message?: string) => new InvalidRequestError(message));
  map.set(HttpStatusCode.Conflict, (message?: string) => new DuplicateObjectError(message));
  map.set(HttpStatusCode.Forbidden, (message?: string) => new IllegalRequestError(message));
  map.set(
    HttpStatusCode.InternalServerError,
    (message?: string) => new InternalServiceError(message),
  );
  map.set(HttpStatusCode.NotFound, (message?: string) => new ObjectNotFoundError(message));
  map.set(
    HttpStatusCode.ServiceUnavailable,
    (message?: string) => new ServiceUnavailableError(message),
  );
  map.set(HttpStatusCode.Unauthorized, (message?: string) => new UnauthorizedError(message));

  return map;
}

export function mapApiError(error: unknown): ApiError | undefined {
  let mappingResult: ApiError | undefined = undefined;

  if (error instanceof HttpErrorResponse) {
    mappingResult = mapHttpError(error);
  }

  if (mappingResult === undefined) {
    console.log('Unmapped error occurred: ' + error);
  }

  return mappingResult;
}

function mapHttpError(httpErrorResponse: HttpErrorResponse): ApiError | undefined {
  let mappingResult: ApiError | undefined = undefined;

  const httpStatusCode: number = httpErrorResponse.status;
  const errorConstructor: ((message?: string) => ApiError) | undefined =
    httpStatusCodeToApiErrorMap.get(httpStatusCode);
  if (errorConstructor !== undefined) {
    const backendMessage: string = extractErrorMessage(httpErrorResponse);
    mappingResult = errorConstructor(backendMessage);
  }

  return mappingResult;
}

// Don't we all love JS? ;)
function extractErrorMessage(httpErrorResponse: HttpErrorResponse): string {
  const errorPayload: unknown = httpErrorResponse.error;

  if (httpErrorResponse.status === HTTP_STATUS_MAIN_NETWORK_ISSUES) {
    return 'The backend service structure is completely unreachable.';
  }

  if (typeof errorPayload === 'string') {
    return errorPayload;
  }

  if (errorPayload !== null && typeof errorPayload === 'object') {
    if ('message' in errorPayload && typeof (errorPayload as any).message === 'string') {
      return (errorPayload as any).message;
    }
  }

  return httpErrorResponse.message;
}

export async function executeApiCall<T>(stream$: Observable<T>): Promise<T> {
  try {
    return await firstValueFrom(stream$);
  } catch (error) {
    const apiError: ApiError | undefined = mapApiError(error);
    throw apiError !== undefined ? apiError : error;
  }
}
