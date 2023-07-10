import { useHomeController } from "@/modules/customer-acquisition";
import { LeadDto } from "@packages/customer-acquisition";
import { FormEvent, useEffect, useState } from "react";

interface ListLeadsProps {
  leads: {
    id: string;
    fullName: string;
    cpf: string;
    email: string;
    hasSomething: boolean;
  }[];
  onSearch?: (query?: string) => Promise<LeadDto[] | undefined>;
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
  onSubmit?: (data: LeadDto) => Promise<void>;
  refreshLeads?: (query?: string) => Promise<LeadDto[] | undefined>;
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
  const [form, setForm] = useState<Partial<LeadDto>>(lead || {});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit && (await onSubmit(form as LeadDto));
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
            value={form.fullName || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          CPF
          <input
            name={"cpf"}
            value={form.cpf || ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          E-mail
          <input
            name={"email"}
            value={form.email || ""}
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
  const [
    { leads, error, loading },
    { handleCreateOrUpdateLead, handleFilterLeads },
  ] = useHomeController();

  if (loading) return <div>Loading...</div>;

  let lead;
  if (leads && leadId) {
    lead = leads.find((lead) => lead.id === leadId);
  }

  return (
    <>
      {error ? <div>{error}</div> : null}
      <CreateOrUpdateLeadView
        onSubmit={async (data) => {
          handleCreateOrUpdateLead && (await handleCreateOrUpdateLead(data));
          setLeadId(undefined);
        }}
        refreshLeads={handleFilterLeads}
        lead={lead}
      />
      {leads ? (
        <ListLeadsView
          leads={leads}
          onSearch={handleFilterLeads}
          onEditClick={(id: string) => setLeadId(id)}
        />
      ) : null}
    </>
  );
}
