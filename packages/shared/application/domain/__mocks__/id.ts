import { ValueObject } from "./value-object";

export class Id extends ValueObject {
  public static generate() {
    return "generated-id";
  }
}
