import { IdentifierPort } from "@packages/shared";

const randomLastUuidPart = () =>
  Math.floor(Math.random() * 100000000000) + 100000000000;

class FakeIdentifierAdapter implements IdentifierPort {
  generate(): string {
    return "7d4e8097-abd5-4e7d-919f-" + randomLastUuidPart();
  }

  validate(id: string): boolean {
    return id.includes("7d4e8097-abd5-4e7d-919f-");
  }
}

export default FakeIdentifierAdapter;
