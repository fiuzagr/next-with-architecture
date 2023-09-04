import { IdentifierPort } from "@packages/core";

const randomLastUuidPart = () => {
  const randomRange = 100000000000;
  return Math.floor(Math.random() * randomRange) + randomRange;
};

export class FakeIdentifierAdapter implements IdentifierPort {
  generate(): string {
    return "7d4e8097-abd5-4e7d-919f-" + randomLastUuidPart();
  }

  validate(id: string): boolean {
    return id.includes("7d4e8097-abd5-4e7d-919f-");
  }
}
