import { LoggerPort } from "@packages/shared";
import Provider from "./provider";

class LoggerProvider extends Provider<LoggerPort> {
  static getInstance(): any {
    return super.getInstance(LoggerProvider.name);
  }
}

export default LoggerProvider;
