import { filterLeadsUseCase } from "@/modules/customer-acquisition/main";
import { QueryResult, useQuery } from "@/modules/shared";
import {
  FilterLeadsRequest,
  FilterLeadsResponse,
} from "@packages/customer-acquisition";
import { useCallback, useState } from "react";

export const useFilterLeads = (): QueryResult<FilterLeadsResponse> => {
  const [filter, setFilter] = useState<FilterLeadsRequest>({
    data: {
      query: undefined,
      offset: 0,
      limit: 1000,
    },
  });

  const filterCallback = useCallback(
    () => filterLeadsUseCase.execute(filter),
    [filter]
  );

  const [queryData, _handleFilterLeads] =
    useQuery<FilterLeadsResponse>(filterCallback);

  const handleFilterLeads = async (query?: string) => {
    setFilter((prevFilter) => ({ ...prevFilter, query }));
    return await _handleFilterLeads();
  };

  return [queryData, handleFilterLeads];
};
