import { GenericError } from "@packages/core";
import { ValueObject } from "@packages/core/application/domain/value-object";

export class InvalidFullPersonNameError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "InvalidFullPersonNameError";
  }
}

export class FullPersonName extends ValueObject<string> {
  constructor(value: string) {
    const sanitizedValue = FullPersonName.sanitize(value);

    if (!FullPersonName.isValid(sanitizedValue)) {
      throw new InvalidFullPersonNameError("Invalid value");
    }

    super(sanitizedValue);
  }

  public static isValid(value: string) {
    return /^\p{Letter}{2,}(\s\p{Letter}{2,})+$/iu.test(value);
  }

  public static sanitize(value: string) {
    return value
      .replaceAll(/(^\s|\s$)/g, "")
      .replaceAll(/\s/g, " ")
      .replaceAll(/[^\p{Letter}]/gu, "");
  }

  public toString() {
    return `${this.constructor.name}(${this.value})`;
  }
}
