import { LeadDto } from "@packages/customer-acquisition";
import { Event } from "@packages/shared/application/domain";

interface EventData {
  lead: LeadDto;
}

class LeadUpdatedEvent extends Event<EventData> {}

export default LeadUpdatedEvent;
