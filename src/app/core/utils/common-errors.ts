// TODO Move to common utils library

export abstract class BaseError extends Error {
  constructor(message?: string) {
    super(message);

    // Assign the exact descendant's class name (e.g., "IllegalArgumentError")
    this.name = new.target.name;

    /*
			Restore the prototype chain using the exact dependant's true prototype.
			Not necessary for every inheritance in TS, but when we inherit from
			native built-in objects like Errors.
		*/
    Object.setPrototypeOf(this, new.target.prototype);

    // Remove this constructor from the stacktrace
    if ('captureStackTrace' in Error) {
      (Error as any).captureStackTrace(this, new.target);
    }
  }
}

export class IllegalArgumentError extends BaseError {
  constructor(message?: string) {
    super(message);
  }
}

export class IndexOutOfBoundsError extends BaseError {
  constructor(message?: string) {
    super(message);
  }
}

export class InvalidStateError extends BaseError {
  constructor(message?: string) {
    super(message);
  }
}

export class UnsupportedOperationError extends BaseError {
  constructor(message?: string) {
    super(message);
  }
}
