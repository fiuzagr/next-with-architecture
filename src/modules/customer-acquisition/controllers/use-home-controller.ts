import {
  useFilterLeads,
  useListLeadsPresenter,
  useSaveLead,
} from "@/modules/customer-acquisition";

export const useHomeController = () => {
  const [
    { data: responseFilterLeads, error: leadError, loading: leadLoading },
    handleFilterLeads,
  ] = useFilterLeads();

  const [{ error: saveLeadError, loading: saveLeadLoading }, handleSaveLead] =
    useSaveLead();

  const error = leadError ?? saveLeadError;
  const loading = leadLoading || saveLeadLoading;
  const leads = useListLeadsPresenter(responseFilterLeads?.data?.leads);

  return [
    {
      leads,
      error,
      loading,
    },
    {
      handleSaveLead,
      handleFilterLeads,
    },
  ];
};
