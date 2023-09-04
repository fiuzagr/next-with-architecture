import { jest } from "@jest/globals";

export const IdentifierProvider = {
  getInstance: jest.fn(() => {
    return {
      generate: jest.fn(() => "mocked-id"),
      validate: jest.fn(() => true),
    };
  }),
};
