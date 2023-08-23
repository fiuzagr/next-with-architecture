import { Customer } from "@packages/customer-acquisition/application/domain";

export interface CustomerRepositoryPort {
  save(customer: Customer): Promise<void>;
}
