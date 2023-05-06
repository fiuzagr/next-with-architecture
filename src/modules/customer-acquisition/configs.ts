import { LogLevelStrings } from "@packages/shared";

export const isBrowser = typeof window !== "undefined";

export const consoleLoggerSettings = {
  level: "debug" as LogLevelStrings,
};
