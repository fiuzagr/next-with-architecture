import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LeadCreatedEvent } from "@packages/customer-acquisition";
import { IdentifierProvider } from "@packages/core";
import { Id } from "@packages/shared/application/domain/id";
import { Lead } from "../lead";

jest.mock("@packages/core/application/providers/identifier-provider");
jest.mock("@packages/shared/application/domain/id");
jest.mock("@packages/shared/application/domain/email");
jest.mock("@packages/shared/application/domain/cpf");
jest.mock("@packages/shared/application/domain/full-person-name");

const leadWithoutId = {
  fullName: "mocked",
  cpf: "mocked",
  email: "mocked",
};
const leadWithId = {
  id: "mocked",
  ...leadWithoutId,
};

describe("Lead", () => {
  beforeEach(() => {
    (IdentifierProvider.getInstance as jest.Mock).mockClear();
  });

  test("create lead instance from json with ID", () => {
    const lead = Lead.fromDTO(leadWithId);

    expect(lead).toBeInstanceOf(Lead);
    expect(lead.id.toString()).toEqual(leadWithId.id);
    expect(IdentifierProvider.getInstance).toBeCalledTimes(0);
  });

  test("create lead instance from json without ID", () => {
    const lead = Lead.fromDTO(leadWithoutId);

    expect(lead).toBeInstanceOf(Lead);
    expect(lead.id).toBeInstanceOf(Id);
    expect(lead.events[0]).toBeInstanceOf(LeadCreatedEvent);
  });

  test("convert lead instance to json", () => {
    const lead = Lead.fromDTO(leadWithId);
    expect(lead.toJSON()).toMatchObject(leadWithId);
  });
});
