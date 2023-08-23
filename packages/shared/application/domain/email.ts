import { InvalidEmailError } from "@packages/shared";
import { ValueObject } from "@packages/shared/application/domain/value-object";

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
}
