import { Event } from "@packages/shared/application/domain";
import { LeadDTO } from "@packages/customer-acquisition";

interface EventData {
  lead: LeadDTO;
}

export class LeadUpdatedEvent extends Event<EventData> {}
