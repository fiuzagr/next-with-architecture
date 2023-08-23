import { Customer } from "@packages/customer-acquisition/application/domain";
import {
  CustomerDTO,
  CustomerRepositoryPort,
  DataSourcePort,
} from "@packages/customer-acquisition";

export class CustomerRepository implements CustomerRepositoryPort {
  constructor(private readonly dataSource: DataSourcePort<CustomerDTO>) {}

  async save(customer: Customer) {
    await this.dataSource.save(customer.toJSON());
  }
}
