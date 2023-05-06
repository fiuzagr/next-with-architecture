export abstract class GenericError extends Error {
  public constructor(error?: string | Error, ...args: any[]) {
    let errorMessage: string | undefined;

    if (error instanceof Error) {
      errorMessage = `${error.name}: ${error.message}`;
    } else {
      errorMessage = error;
    }

    super(errorMessage, ...args);
  }
}

export class UnknownError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "UnknownError";
  }
}

export class InvalidCpfError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "InvalidCpfError";
  }
}

export class InvalidEmailError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "InvalidEmailError";
  }
}

export class InvalidFullPersonNameError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "InvalidFullPersonNameError";
  }
}

export class InvalidIdError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "InvalidIdError";
  }
}
