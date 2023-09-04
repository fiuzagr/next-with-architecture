import { GenericError } from "@packages/core";

export class CreateLeadError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "CreateLeadError";
  }
}

export class UpdateLeadError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "UpdateLeadError";
  }
}

export class CreateCustomerError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "CreateCustomerError";
  }
}
