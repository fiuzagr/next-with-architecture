import { CustomerDTO } from "@packages/customer-acquisition";
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

export class Customer extends Entity<CustomerProps, CustomerDTO> {
  constructor(props: CustomerProps, id?: string | null) {
    super(props, id);

    if (!id) {
      this.addEvent(new CustomerCreatedEvent({ customer: this.toJSON() }));
    }
  }

  static fromDTO(dto: CustomerDTO) {
    Customer.validate(dto);

    return new Customer(
      {
        fullName: new FullPersonName(dto.fullName),
        cpf: new Cpf(dto.cpf),
        email: new Email(dto.email),
        leadId: new Id(dto.leadId),
      },
      dto.id ?? null
    );
  }

  static validate(dto: CustomerDTO) {
    const errors = [
      ValueObject.validate<string>(FullPersonName, dto.fullName),
      ValueObject.validate<string>(Cpf, dto.cpf),
      ValueObject.validate<string>(Email, dto.email),
    ].filter((value) => value);

    if (errors.length) {
      throw errors;
    }

    return true;
  }
}
