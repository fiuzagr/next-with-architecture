import { filterLeadsUseCase } from "@/modules/customer-acquisition/main";
import { useQuery } from "@/modules/shared";
import { FilterDto, LeadDto } from "@packages/customer-acquisition";
import { useCallback } from "react";

const useFilterLeads = (filter: FilterDto) => {
  const filterCallback = useCallback(
    () => filterLeadsUseCase.execute(filter),
    [filter]
  );
  return useQuery<string, LeadDto[]>(filterCallback);
};

export default useFilterLeads;
