import { LoggerPort, LogLevel, LogLevelStrings } from "@packages/core";

interface LoggerSettings {
  appName?: string;
  level: LogLevelStrings;
}

const defaultLoggerSettings = {
  appName: "app",
  level: "warn" as LogLevelStrings,
};

export class ConsoleLoggerAdapter implements LoggerPort {
  private readonly settings: LoggerSettings;

  constructor(settings: LoggerSettings = defaultLoggerSettings) {
    this.settings = Object.assign({}, defaultLoggerSettings, settings);
  }

  debug(...args: any[]) {
    this.log("debug", ...args);
  }

  info(...args: any[]) {
    this.log("info", ...args);
  }

  warn(...args: any[]) {
    this.log("warn", ...args);
  }

  error(...args: any[]) {
    this.log("error", ...args);
  }

  private isLogLevelEnabled(level: LogLevelStrings) {
    return LogLevel[level] <= LogLevel[this.settings.level];
  }

  private log(level: LogLevelStrings, ...args: any[]) {
    if (this.isLogLevelEnabled(level)) {
      const consoleArgs = [
        level.toUpperCase(),
        new Date().toISOString(),
        `[${this.settings.appName}]`,
        ...args,
      ];
      const consoleLevel = level in console ? level : "log";

      console[consoleLevel](...consoleArgs);
    }
  }
}
