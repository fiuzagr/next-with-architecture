import {
  EventDispatcherPort,
  EventHandlerPort,
  EventsManager,
  LoggerProvider,
} from "@packages/shared";
import { Event } from "@packages/shared/application/domain";

class EventDispatcherAdapter implements EventDispatcherPort {
  private eventHandlers = new Map<string, EventHandlerPort[]>();

  getHandlers(eventName: string) {
    return this.eventHandlers.get(eventName) ?? [];
  }

  getAllHandlers() {
    return this.eventHandlers.entries();
  }

  notify(eventsManagers: EventsManager[]) {
    eventsManagers.forEach((manager) => {
      manager.events.forEach((event: Event) => {
        const eventName = event.constructor.name;
        this.eventHandlers
          .get(eventName)
          ?.map((handler) => handler.handle(event));

        LoggerProvider.getInstance().debug(
          EventDispatcherAdapter.name,
          "notify",
          eventName,
          event
        );
      });

      manager.clearEvents();
    });
  }

  register(eventNames: string[], eventHandler: EventHandlerPort) {
    eventNames.forEach((eventName) => {
      const handlers = this.eventHandlers.get(eventName) ?? [];

      const hasSomeHandler = handlers.some(
        (handler) => handler === eventHandler
      );
      if (!hasSomeHandler) {
        this.eventHandlers.set(eventName, [...handlers, eventHandler]);
      }

      LoggerProvider.getInstance().debug(
        EventDispatcherAdapter.name,
        "register",
        eventName,
        eventHandler,
        hasSomeHandler ? "already registered" : "registered"
      );
    });
  }
}

export default EventDispatcherAdapter;
