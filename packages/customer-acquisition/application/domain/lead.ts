import { LeadCreatedEvent } from "@packages/customer-acquisition/application/domain/events";
import {
  Cpf,
  Email,
  Entity,
  FullPersonName,
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

    if (id === null || id === undefined) {
      this.addEvent(new LeadCreatedEvent({ lead: this.toJSON() }));
    }
  }

  static fromJSON(json: LeadJSON) {
    return new Lead(
      {
        fullName: new FullPersonName(json.fullName),
        cpf: new Cpf(json.cpf),
        email: new Email(json.email),
      },
      json.id || null
    );
  }
}

export default Lead;
