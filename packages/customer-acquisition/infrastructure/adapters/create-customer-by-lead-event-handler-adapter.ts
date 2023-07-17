import {
  EventDataDto,
  EventHandlerPort,
  LoggerPort,
  UseCasePort,
} from "@packages/shared";
import { Event } from "@packages/shared/application/domain";
import { CreateCustomerDto } from "@packages/customer-acquisition";

class CreateCustomerByLeadEventHandlerAdapter implements EventHandlerPort {
  constructor(
    private useCase: UseCasePort<CreateCustomerDto, void>,
    private logger: LoggerPort
  ) {}

  handle(event: Event<EventDataDto>) {
    const customer = {
      ...event.data.lead,
      id: undefined,
      leadId: event.data.lead.id,
    };
    this.useCase.execute(customer).catch((error) => {
      this.logger.error(error);
    });
  }
}

export default CreateCustomerByLeadEventHandlerAdapter;
