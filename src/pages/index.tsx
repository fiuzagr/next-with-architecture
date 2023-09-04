import { useHomeController } from "@/modules/customer-acquisition";
import { FilterLeadsResponse, LeadDTO } from "@packages/customer-acquisition";
import { FormEvent, useCallback, useEffect, useState } from "react";

interface ListLeadsProps {
  leads: {
    id: string;
    fullName: string;
    cpf: string;
    email: string;
    hasSomething: boolean;
  }[];
  onSearch?: (query?: string) => Promise<FilterLeadsResponse | undefined>;
  onEditClick: (id: string) => void;
}

const ListLeadsView = ({ leads, onSearch, onEditClick }: ListLeadsProps) => {
  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSearch && (await onSearch(formData.get("search") as string));
  };

  return (
    <div>
      <h1>List Leads</h1>
      <form onSubmit={handleSearch}>
        <label>
          Search
          <input name={"search"} />
        </label>
        <button type={"submit"}>Search</button>
      </form>
      <table border={1}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Has something</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(({ id, fullName, cpf, email, hasSomething }) => (
            <tr key={id}>
              <td>{fullName}</td>
              <td>{cpf}</td>
              <td>{email}</td>
              <td>{hasSomething ? "Yes" : null}</td>
              <td>
                <button onClick={() => onEditClick(id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface CreateOrUpdateLeadViewProps {
  onSubmit?: (data: LeadDTO) => Promise<void>;
  refreshLeads?: (query?: string) => Promise<FilterLeadsResponse | undefined>;
  lead?: {
    id: string;
    fullName: string;
    cpf: string;
    email: string;
  };
}

const CreateOrUpdateLeadView = ({
  onSubmit,
  refreshLeads,
  lead,
}: CreateOrUpdateLeadViewProps) => {
  const [form, setForm] = useState<Partial<LeadDTO>>(lead ?? {});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit && (await onSubmit(form as LeadDTO));
    refreshLeads && (await refreshLeads());
    setForm({});
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const editing = !!form.id;

  useEffect(() => {
    if (lead) {
      setForm(lead);
    }
  }, [lead]);

  return (
    <div>
      {editing ? <h1>Update Lead</h1> : <h1>Create Lead</h1>}

      <form onSubmit={handleSubmit}>
        {editing ? <input type={"hidden"} name={"id"} value={form.id} /> : null}

        <label>
          Full name
          <input
            name={"fullName"}
            value={form.fullName ?? ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          CPF
          <input
            name={"cpf"}
            value={form.cpf ?? ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          E-mail
          <input
            name={"email"}
            value={form.email ?? ""}
            onChange={handleInputChange}
          />
        </label>
        <button type={"submit"}>{editing ? "Editar" : "Criar"}</button>
      </form>
    </div>
  );
};

export default function HomePage() {
  const [leadId, setLeadId] = useState<string | undefined>(undefined);
  const [{ leads, error, loading }, { handleSaveLead, handleFilterLeads }] =
    useHomeController();

  const handleSaveFormLead = useCallback(
    async (data: LeadDTO) => {
      handleSaveLead && (await handleSaveLead(data));
      setLeadId(undefined);
    },
    [handleSaveLead]
  );
  const handleSetLeadToEdit = useCallback((id: string) => setLeadId(id), []);

  let foundLead;
  if (leads && leadId) {
    foundLead = leads.find((lead) => lead.id === leadId);
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      {error ? <div>{error}</div> : null}
      <CreateOrUpdateLeadView
        onSubmit={handleSaveFormLead}
        refreshLeads={handleFilterLeads}
        lead={foundLead}
      />
      {leads ? (
        <ListLeadsView
          leads={leads}
          onSearch={handleFilterLeads}
          onEditClick={handleSetLeadToEdit}
        />
      ) : null}
    </>
  );
}
