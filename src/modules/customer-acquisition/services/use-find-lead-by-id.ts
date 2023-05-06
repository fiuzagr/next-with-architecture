import { findLeadByIdUseCase } from "@/modules/customer-acquisition/main";
import { useQuery } from "@/modules/shared";
import { LeadDto } from "@packages/customer-acquisition";

const useFindLeadById = (id: string) => {
  return useQuery<string, LeadDto>(() => findLeadByIdUseCase.execute(id));
};

export default useFindLeadById;
