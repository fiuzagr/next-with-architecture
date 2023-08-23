import {
  DataSourcePort,
  LeadDTO,
  LeadRepositoryPort,
} from "@packages/customer-acquisition";
import { Lead } from "@packages/customer-acquisition/application/domain";

export class LeadRepository implements LeadRepositoryPort {
  constructor(private readonly dataSource: DataSourcePort<LeadDTO>) {}

  async save(lead: Lead) {
    await this.dataSource.save(lead.toJSON());
  }

  async find(id: string) {
    const leadDto = await this.dataSource.find(id);
    return Lead.fromDTO(leadDto);
  }
}
