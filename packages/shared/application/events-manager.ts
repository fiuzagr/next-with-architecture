import Event from "@packages/shared/application/domain/event";

abstract class EventsManager {
  private _events: Event[] = [];

  get events(): Event[] {
    return [...this._events];
  }

  addEvent(event: Event) {
    this._events.push(event);
  }

  clearEvents() {
    this._events = [];
  }
}

export default EventsManager;
