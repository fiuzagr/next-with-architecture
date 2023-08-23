export class ValueObject {
  get value() {
    return "mocked";
  }

  public static isValid() {
    return true;
  }

  toString() {
    return "mocked";
  }

  toJSON() {
    return "mocked";
  }
}
