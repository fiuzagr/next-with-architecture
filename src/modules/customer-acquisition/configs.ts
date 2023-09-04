import { LogLevelStrings } from "@packages/core";

export const isBrowser = typeof window !== "undefined";

export const consoleLoggerSettings = {
  level: "debug" as LogLevelStrings,
};
