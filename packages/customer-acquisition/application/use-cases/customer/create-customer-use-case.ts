import {
  CreateCustomerError,
  CustomerRepositoryPort,
} from "@packages/customer-acquisition";
import { Customer } from "@packages/customer-acquisition/application/domain";
import {
  EventDispatcherPort,
  LoggerProvider,
  RequestDto,
  UseCasePort,
} from "@packages/core";

export type CreateCustomerRequest = RequestDto<{
  fullName: string;
  cpf: string;
  email: string;
  leadId: string;
}>;

export class CreateCustomerUseCase
  implements UseCasePort<CreateCustomerRequest, void>
{
  constructor(
    private readonly repository: CustomerRepositoryPort,
    private readonly eventDispatcher: EventDispatcherPort
  ) {}

  async execute(request: CreateCustomerRequest) {
    try {
      const customer = Customer.fromDTO({
        ...request.data,
        id: undefined,
      });
      await this.repository.save(customer);

      this.eventDispatcher.notify([customer]);

      LoggerProvider.getInstance().debug(CreateCustomerUseCase.name, {
        request,
        customer,
      });
    } catch (error) {
      throw new CreateCustomerError(error as Error);
    }
  }
}
