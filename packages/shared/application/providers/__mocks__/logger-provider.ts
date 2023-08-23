import { jest } from "@jest/globals";

export const LoggerProvider = {
  getInstance: jest.fn(() => {
    return {
      info: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
    };
  }),
};
