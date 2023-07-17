import { CustomerCreatedEvent } from "@packages/customer-acquisition/application/domain/events";
import {
  Cpf,
  Email,
  Entity,
  FullPersonName,
  Id,
  ValueObject,
} from "@packages/shared/application/domain";

interface CustomerProps {
  fullName: FullPersonName;
  cpf: Cpf;
  email: Email;
  leadId: Id;
}

interface CustomerJSON {
  id?: string;
  fullName: string;
  cpf: string;
  email: string;
  leadId: string;
}

class Customer extends Entity<CustomerProps, CustomerJSON> {
  constructor(props: CustomerProps, id?: string | null) {
    super(props, id);

    if (!id) {
      this.addEvent(new CustomerCreatedEvent({ customer: this.toJSON() }));
    }
  }

  static fromJSON(json: CustomerJSON) {
    Customer.validate(json);

    return new Customer(
      {
        fullName: new FullPersonName(json.fullName),
        cpf: new Cpf(json.cpf),
        email: new Email(json.email),
        leadId: new Id(json.leadId),
      },
      json.id ?? null
    );
  }

  static validate(json: CustomerJSON) {
    const errors = [
      ValueObject.validate<string>(FullPersonName, json.fullName),
      ValueObject.validate<string>(Cpf, json.cpf),
      ValueObject.validate<string>(Email, json.email),
    ].filter((value) => value);

    if (errors.length) throw errors;

    return true;
  }
}

export default Customer;
