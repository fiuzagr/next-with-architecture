import {
  DataSourcePort,
  LeadDto,
  LeadRepositoryPort,
} from "@packages/customer-acquisition";
import { Lead } from "@packages/customer-acquisition/application/domain";

class LeadRepository implements LeadRepositoryPort {
  constructor(private dataSource: DataSourcePort<LeadDto>) {}

  async save(lead: Lead) {
    await this.dataSource.save(lead.toJSON());
  }

  async find(id: string) {
    const leadDto = await this.dataSource.find(id);
    return Lead.fromJSON(leadDto);
  }
}

export default LeadRepository;
