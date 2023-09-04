import {
  EventDispatcherPort,
  EventHandlerPort,
  EventsManager,
  LoggerProvider,
} from "@packages/core";
import { Event } from "@packages/core/application/domain";

export class EventDispatcherAdapter implements EventDispatcherPort {
  private readonly eventHandlers = new Map<string, EventHandlerPort[]>();

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

        Promise.all(
          this.getHandlers(eventName).map((handler) => handler.handle(event))
        )
          .then(() => {
            manager.removeEvent(event);
          })
          .catch((error) => {
            LoggerProvider.getInstance().error(
              EventDispatcherAdapter.name,
              "notify",
              eventName,
              error
            );
          });

        LoggerProvider.getInstance().debug(
          EventDispatcherAdapter.name,
          "notify",
          eventName,
          event
        );
      });
    });
  }

  register(eventNames: string[], eventHandler: EventHandlerPort) {
    eventNames.forEach((eventName) => {
      const handlers = this.getHandlers(eventName);

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
