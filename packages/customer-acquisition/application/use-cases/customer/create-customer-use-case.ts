import {
  CreateCustomerDto,
  CreateCustomerError,
  CustomerRepositoryPort,
} from "@packages/customer-acquisition";
import { Customer } from "@packages/customer-acquisition/application/domain";
import {
  EventDispatcherPort,
  LoggerProvider,
  UseCasePort,
} from "@packages/shared";

class CreateCustomerUseCase implements UseCasePort<CreateCustomerDto, void> {
  constructor(
    private repository: CustomerRepositoryPort,
    private eventDispatcher: EventDispatcherPort
  ) {}

  async execute(customerDto: CreateCustomerDto) {
    try {
      const customer = Customer.fromJSON({
        ...customerDto,
        id: undefined,
      });
      await this.repository.save(customer);

      this.eventDispatcher.notify([customer]);

      LoggerProvider.getInstance().debug(CreateCustomerUseCase.name, {
        customerDto,
        customer,
      });
    } catch (error) {
      throw new CreateCustomerError(error as Error);
    }
  }
}

export default CreateCustomerUseCase;
