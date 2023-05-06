import { GenericError } from "@packages/shared";

export class CreateLeadError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "CreateLeadError";
  }
}
