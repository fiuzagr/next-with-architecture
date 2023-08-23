import {
  useCreateLead,
  useFilterLeads,
  useListLeadsPresenter,
  useUpdateLead,
} from "@/modules/customer-acquisition";
import {
  CreateLeadRequest,
  FilterLeadsRequest,
  LeadDTO,
  UpdateLeadRequest,
} from "@packages/customer-acquisition";
import { useState } from "react";

export const useHomeController = () => {
  const [filter, setFilter] = useState<FilterLeadsRequest>({
    data: {
      query: undefined,
      offset: 0,
      limit: 1000,
    },
  });

  const [
    { data: responseFilterLeads, error: leadError, loading: leadLoading },
    _handleFilterLeads,
  ] = useFilterLeads(filter);

  const [
    { error: createLeadError, loading: createLeadLoading },
    handleCreateLead,
  ] = useCreateLead();

  const [
    { error: updateLeadError, loading: updateLeadLoading },
    handleUpdateLead,
  ] = useUpdateLead();

  const handleFilterLeads = async (query?: string) => {
    setFilter((prevFilter) => ({ ...prevFilter, query }));
    return await _handleFilterLeads();
  };

  const handleCreateOrUpdateLead = async (lead: LeadDTO) => {
    if (lead.id) {
      await handleUpdateLead({ data: lead } as UpdateLeadRequest);
    } else {
      await handleCreateLead({ data: lead } as CreateLeadRequest);
    }
  };

  const error = leadError ?? createLeadError ?? updateLeadError;
  const loading = leadLoading || createLeadLoading || updateLeadLoading;
  const leads = useListLeadsPresenter(responseFilterLeads?.data?.leads);

  return [
    {
      leads,
      error,
      loading,
    },
    {
      handleCreateOrUpdateLead,
      handleFilterLeads,
    },
  ];
};
