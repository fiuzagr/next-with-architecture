import { InvalidCpfError } from "@packages/core";
import { ValueObject } from "@packages/core/application/domain/value-object";

export class Cpf extends ValueObject<string> {
  constructor(value: string) {
    const sanitizedValue = Cpf.sanitize(value);

    if (!Cpf.isValid(sanitizedValue)) {
      throw new InvalidCpfError("Invalid value");
    }

    super(sanitizedValue);
  }

  public static isValid(value: string) {
    return /^\d{11}$/.test(value);
  }

  public static sanitize(value: string) {
    return value.replaceAll(/\D/g, "");
  }
}
