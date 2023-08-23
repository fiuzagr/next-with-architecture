import { LeadDTO } from "@packages/customer-acquisition";
import {
  LeadCreatedEvent,
  LeadUpdatedEvent,
} from "@packages/customer-acquisition/application/domain/events";
import {
  Cpf,
  Email,
  Entity,
  FullPersonName,
  ValueObject,
} from "@packages/shared/application/domain";

interface LeadProps {
  fullName: FullPersonName;
  cpf: Cpf;
  email: Email;
}

export class Lead extends Entity<LeadProps, LeadDTO> {
  constructor(props: LeadProps, id?: string | null) {
    super(props, id);

    if (!id) {
      this.addEvent(new LeadCreatedEvent({ lead: this.toJSON() }));
    }
  }

  static fromDTO(dto: LeadDTO) {
    Lead.validate(dto);

    return new Lead(
      {
        fullName: new FullPersonName(dto.fullName),
        cpf: new Cpf(dto.cpf),
        email: new Email(dto.email),
      },
      dto.id ?? null
    );
  }

  static validate(dto: LeadDTO) {
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

  public update(dto: LeadDTO) {
    Lead.validate(dto);

    this.props = {
      fullName: new FullPersonName(dto.fullName),
      cpf: new Cpf(dto.cpf),
      email: new Email(dto.email),
    };

    this.addEvent(new LeadUpdatedEvent({ lead: this.toJSON() }));
  }
}
