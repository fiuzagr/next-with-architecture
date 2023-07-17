import { Customer } from "@packages/customer-acquisition/application/domain";

interface CustomerRepositoryPort {
  save(customer: Customer): Promise<void>;
}

export default CustomerRepositoryPort;
