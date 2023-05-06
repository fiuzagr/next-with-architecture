import { InvalidCpfError } from "@packages/shared";
import ValueObject from "@packages/shared/application/domain/value-object";

class Cpf extends ValueObject<string> {
  constructor(value: string) {
    const sanitizedValue = Cpf.sanitize(value);

    if (!Cpf.isValid(sanitizedValue)) {
      throw new InvalidCpfError("Invalid value");
    }

    super(sanitizedValue);
  }

  public static isValid(value: string) {
    return /^[0-9]{11}$/.test(value);
  }

  public static sanitize(value: string) {
    return value.replaceAll(/[^0-9]/g, "");
  }
}

export default Cpf;
