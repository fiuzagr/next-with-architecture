import { LeadCreatedEvent } from "@packages/customer-acquisition/application/domain/events";
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

interface LeadJSON {
  id?: string;
  fullName: string;
  cpf: string;
  email: string;
}

class Lead extends Entity<LeadProps, LeadJSON> {
  constructor(props: LeadProps, id?: string | null) {
    super(props, id);

    if (!id) {
      this.addEvent(new LeadCreatedEvent({ lead: this.toJSON() }));
    }
  }

  static fromJSON(json: LeadJSON) {
    Lead.validate(json);

    return new Lead(
      {
        fullName: new FullPersonName(json.fullName),
        cpf: new Cpf(json.cpf),
        email: new Email(json.email),
      },
      json.id || null
    );
  }

  static validate(json: LeadJSON) {
    const errors = [
      ValueObject.validate<string>(FullPersonName, json.fullName),
      ValueObject.validate<string>(Cpf, json.cpf),
      ValueObject.validate<string>(Email, json.email),
    ].filter((value) => value);

    if (errors.length) throw errors;

    return true;
  }
}

export default Lead;
