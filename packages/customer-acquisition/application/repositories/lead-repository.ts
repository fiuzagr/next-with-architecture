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
}

export default LeadRepository;
