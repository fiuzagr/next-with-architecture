import { Customer } from "@packages/customer-acquisition/application/domain";
import {
  CustomerDto,
  CustomerRepositoryPort,
  DataSourcePort,
} from "@packages/customer-acquisition";

class CustomerRepository implements CustomerRepositoryPort {
  constructor(private dataSource: DataSourcePort<CustomerDto>) {}

  async save(customer: Customer) {
    await this.dataSource.save(customer.toJSON());
  }
}

export default CustomerRepository;
