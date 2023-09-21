import { GenericError } from "@packages/core";
import { ValueObject } from "@packages/core/application/domain/value-object";

export class InvalidEmailError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "InvalidEmailError";
  }
}

export class Email extends ValueObject<string> {
  constructor(value: string) {
    const sanitizedValue = Email.sanitize(value);

    if (!Email.isValid(sanitizedValue)) {
      throw new InvalidEmailError("Invalid value");
    }

    super(sanitizedValue);
  }

  public static isValid(value: string) {
    return /^[-+.\w]{2,}@\w{2,}(\.\w{2,})+$/.test(value);
  }

  public static sanitize(value: string) {
    return value.replaceAll(/\s/g, "");
  }

  public toString() {
    return `${this.constructor.name}(${this.value})`;
  }
}
