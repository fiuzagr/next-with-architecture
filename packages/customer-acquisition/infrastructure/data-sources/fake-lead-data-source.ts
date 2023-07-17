import { FilterDto } from "@packages/customer-acquisition";
import {
  DataSourcePort,
  LeadDto,
} from "@packages/customer-acquisition/application";

class FakeLeadDataSource implements DataSourcePort<LeadDto> {
  async save(lead: LeadDto) {
    console.debug("Saved lead", lead);
  }

  async find(id: string): Promise<LeadDto> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: id,
          fullName: "Full Name",
          cpf: "01234567800",
          email: "email@test.com",
        });
      }, 1000);
    });
  }

  async filter(filter: FilterDto): Promise<LeadDto[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            fullName: "Full Name",
            cpf: "01234567800",
            email: "email@test.com",
          },
          {
            id: "2",
            fullName: "Another Full Name",
            cpf: "00123456789",
            email: "email@another.test.com",
          },
        ]);
      }, 1000);
    });
  }
}

export default FakeLeadDataSource;
