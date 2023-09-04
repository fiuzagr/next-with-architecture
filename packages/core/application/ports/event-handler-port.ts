import { EventDataDto } from "@packages/core";
import { Event } from "@packages/core/application/domain";

export interface EventHandlerPort<
  EventData extends EventDataDto = EventDataDto,
  T extends Event<EventData> = Event<EventData>
> {
  handle(event: T): Promise<void>;
}
