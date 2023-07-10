import { Lead } from "@packages/customer-acquisition/application/domain";

interface LeadRepositoryPort {
  save(lead: Lead): Promise<void>;

  find(id: string): Promise<Lead>;
}

export default LeadRepositoryPort;
