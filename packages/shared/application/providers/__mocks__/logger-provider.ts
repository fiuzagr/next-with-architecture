import { jest } from "@jest/globals";

const Provider = {
  getInstance: jest.fn(() => {
    return {
      info: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
    };
  }),
};

export default Provider;
