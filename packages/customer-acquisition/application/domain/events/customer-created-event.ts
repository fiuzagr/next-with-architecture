import { Event } from "@packages/shared/application/domain";
import { CustomerDto } from "@packages/customer-acquisition";

interface EventData {
  customer: CustomerDto;
}

class CustomerCreatedEvent extends Event<EventData> {}

export default CustomerCreatedEvent;
