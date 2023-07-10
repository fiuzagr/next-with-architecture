import {
  LeadDataSourcePort,
  LeadRepositoryPort,
} from "@packages/customer-acquisition";
import { Lead } from "@packages/customer-acquisition/application/domain";

class LeadRepository implements LeadRepositoryPort {
  private dataSource: LeadDataSourcePort;

  constructor(dataSource: LeadDataSourcePort) {
    this.dataSource = dataSource;
  }

  async save(lead: Lead) {
    await this.dataSource.save(lead.toJSON());
  }

  async find(id: string) {
    const leadDto = await this.dataSource.find(id);
    return Lead.fromJSON(leadDto);
  }
}

export default LeadRepository;
