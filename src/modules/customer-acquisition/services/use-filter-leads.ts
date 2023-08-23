import { filterLeadsUseCase } from "@/modules/customer-acquisition/main";
import { useQuery } from "@/modules/shared";
import {
  FilterLeadsRequest,
  FilterLeadsResponse,
} from "@packages/customer-acquisition";
import { useCallback } from "react";

export const useFilterLeads = (filter: FilterLeadsRequest) => {
  const filterCallback = useCallback(
    () => filterLeadsUseCase.execute(filter),
    [filter]
  );
  return useQuery<string, FilterLeadsResponse>(filterCallback);
};
