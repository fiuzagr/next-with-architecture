import { jest } from "@jest/globals";

const Provider = {
  getInstance: jest.fn(() => {
    return {
      generate: jest.fn(() => "mocked-id"),
      validate: jest.fn(() => true),
    };
  }),
};

export default Provider;
