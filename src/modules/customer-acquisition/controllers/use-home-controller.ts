import {
  useCreateLead,
  useFilterLeads,
  useListLeadsPresenter,
  useUpdateLead,
} from "@/modules/customer-acquisition";
import {
  CreateLeadDto,
  FilterDto,
  LeadDto,
  UpdateLeadDto,
} from "@packages/customer-acquisition";
import { useState } from "react";

const useHomeController = () => {
  const [filter, setFilter] = useState<FilterDto>({
    query: undefined,
    offset: 0,
    limit: 1000,
  });
  const [
    _handleFilterLeads,
    { data: leads, error: leadError, loading: leadLoading },
  ] = useFilterLeads(filter);

  const [
    handleCreateLead,
    { error: createLeadError, loading: createLeadLoading },
  ] = useCreateLead();

  const [
    handleUpdateLead,
    { error: updateLeadError, loading: updateLeadLoading },
  ] = useUpdateLead();

  const error = leadError || createLeadError || updateLeadError;
  const loading = leadLoading || createLeadLoading || updateLeadLoading;

  const handleFilterLeads = async (query?: string) => {
    setFilter((prevFilter) => ({ ...prevFilter, query }));
    return await _handleFilterLeads();
  };

  const handleCreateOrUpdateLead = async (lead: LeadDto) => {
    if (lead.id) {
      await handleUpdateLead(lead as UpdateLeadDto);
    } else {
      await handleCreateLead(lead as CreateLeadDto);
    }
  };

  return [
    {
      leads: useListLeadsPresenter(leads),
      error,
      loading,
    },
    {
      handleCreateOrUpdateLead,
      handleFilterLeads,
    },
  ];
};

export default useHomeController;
