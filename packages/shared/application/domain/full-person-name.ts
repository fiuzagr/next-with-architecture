import { InvalidFullPersonNameError } from "@packages/shared";
import ValueObject from "@packages/shared/application/domain/value-object";

class FullPersonName extends ValueObject<string> {
  constructor(value: string) {
    const sanitizedValue = FullPersonName.sanitize(value);

    if (!FullPersonName.isValid(sanitizedValue)) {
      throw new InvalidFullPersonNameError("Invalid value");
    }

    super(sanitizedValue);
  }

  public static isValid(value: string) {
    return /^[a-z]{2,}(\s[a-z]{2,})+$/i.test(value);
  }

  public static sanitize(value: string) {
    return value.replaceAll(/^\s|\s$/g, "").replaceAll(/\s/g, " ");
  }
}

export default FullPersonName;
