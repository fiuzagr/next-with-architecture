import { GenericError, IdentifierProvider } from "@packages/core";
import { ValueObject } from "@packages/core/application/domain/value-object";

export class InvalidIdError extends GenericError {
  public constructor(error?: string | Error, ...args: any[]) {
    super(error, ...args);
    this.name = "InvalidIdError";
  }
}

export class Id extends ValueObject<string> {
  constructor(value: string | Id) {
    const sanitizedValue = Id.sanitize(value);

    if (!Id.isValid(sanitizedValue)) {
      throw new InvalidIdError("Invalid value");
    }

    super(sanitizedValue);
  }

  public static isValid(value: string) {
    return IdentifierProvider.getInstance().validate(value);
  }

  public static sanitize(value: string | Id) {
    return value.toString();
  }

  public static generate() {
    return new Id(IdentifierProvider.getInstance().generate());
  }

  public toString() {
    return `${this.constructor.name}(${this.value})`;
  }

  public equals(id: Id) {
    return this.value === id.value;
  }
}
