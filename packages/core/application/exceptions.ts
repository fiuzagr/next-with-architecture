export abstract class GenericError extends Error {
  protected constructor(
    error?: string | Error,
    optionsOrFilename?: any,
    ...args: any[]
  ) {
    let errorMessage: string | undefined;
    let cause: Error | undefined;

    if (error instanceof Error) {
      errorMessage = `${error.name}: ${error.message}`;
      cause = error;
    } else {
      errorMessage = error;
    }

    if (typeof optionsOrFilename === "string") {
      args.unshift(optionsOrFilename);
      args.unshift({ cause });
    } else {
      args.unshift({ ...optionsOrFilename, cause });
    }

    super(errorMessage, ...args);
  }

  public toString() {
    return this.message;
  }
}

export class UnknownError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "UnknownError";
  }
}

export class MethodNotImplementedError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "MethodNotImplementedError";
    this.message =
      this.message || "Extends this class and implement this method";
  }
}
