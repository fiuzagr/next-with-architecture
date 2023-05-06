import { LeadDto } from "@packages/customer-acquisition";
import { Event } from "@packages/shared/application/domain";

interface EventData {
  lead: LeadDto;
}

class LeadCreatedEvent extends Event<EventData> {}

export default LeadCreatedEvent;
