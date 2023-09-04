import {
  EventDataDto,
  EventHandlerPort,
  LoggerPort,
  LogLevelStrings,
} from "@packages/core";
import { Event } from "@packages/core/application/domain";

interface Settings {
  logLevel: LogLevelStrings;
}

const defaultSettings: Settings = {
  logLevel: "info",
};

export class LoggerEventHandlerAdapter implements EventHandlerPort {
  constructor(
    private readonly logger: LoggerPort,
    private readonly settings: Settings = defaultSettings
  ) {}

  async handle(event: Event<EventDataDto>) {
    this.logger[this.settings.logLevel](event);
  }
}
