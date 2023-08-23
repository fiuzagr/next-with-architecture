import { IdentifierProvider, InvalidIdError } from "@packages/shared";
import { ValueObject } from "@packages/shared/application/domain/value-object";

export class Id extends ValueObject<string> {
  constructor(value: string | Id) {
    if (value instanceof Id) {
      return value;
    }

    if (!Id.isValid(value)) {
      throw new InvalidIdError("Invalid value");
    }

    super(value);
  }

  public static isValid(value: string) {
    return IdentifierProvider.getInstance().validate(value);
  }

  public static generate() {
    return new Id(IdentifierProvider.getInstance().generate());
  }

  toString() {
    return this.toJSON();
  }
}
