import {
  EventDataDto,
  EventHandlerPort,
  LoggerPort,
  LogLevelStrings,
} from "@packages/shared";
import { Event } from "@packages/shared/application/domain";

interface Settings {
  logLevel: LogLevelStrings;
}

const defaultSettings: Settings = {
  logLevel: "info",
};

class LoggerEventHandlerAdapter implements EventHandlerPort {
  constructor(
    private logger: LoggerPort,
    private settings: Settings = defaultSettings
  ) {}

  handle(event: Event<EventDataDto>) {
    this.logger[this.settings.logLevel](event);
  }
}

export default LoggerEventHandlerAdapter;
