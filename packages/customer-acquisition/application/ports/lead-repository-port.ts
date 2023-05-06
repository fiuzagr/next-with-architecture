import { Lead } from "@packages/customer-acquisition/application/domain";

interface LeadRepositoryPort {
  save(lead: Lead): Promise<void>;
}

export default LeadRepositoryPort;
