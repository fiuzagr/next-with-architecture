import { Event } from "@packages/core/application/domain/event";

export abstract class EventsManager {
  private _events: Event[] = [];

  get events(): Event[] {
    return [...this._events];
  }

  addEvent(event: Event) {
    this._events.push(event);
  }

  removeEvent(event: Event) {
    this._events = this._events.filter((_event) => _event !== event);
  }

  clearEvents() {
    this._events = [];
  }
}
