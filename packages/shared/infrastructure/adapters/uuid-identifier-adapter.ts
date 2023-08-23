import { IdentifierPort } from "@packages/shared";
import { v4 as uuidv4, validate } from "uuid";

export class UuidIdentifierAdapter implements IdentifierPort {
  generate(): string {
    return uuidv4();
  }

  validate(id: string): boolean {
    return validate(id);
  }
}
