import { describe, expect, jest, test } from "@jest/globals";
import {
  CreateLeadUseCase,
  FakeLeadDataSource,
  FindLeadByIdUseCase,
  LeadRepository,
} from "@packages/customer-acquisition";
import { LeadCreatedEvent } from "@packages/customer-acquisition/application/domain";
import {
  ConsoleLoggerAdapter,
  EventDispatcherAdapter,
  LoggerEventHandlerAdapter,
} from "@packages/shared";

jest.mock("@packages/shared/application/providers/logger-provider");
jest.mock("@packages/shared/application/providers/identifier-provider");

const logger = new ConsoleLoggerAdapter({ level: "debug" });
const eventHandler = new LoggerEventHandlerAdapter(logger);
const eventDispatcher = new EventDispatcherAdapter();
const leadDataSource = new FakeLeadDataSource();
const leadRepository = new LeadRepository(leadDataSource);
const findLeadByIdUseCase = new FindLeadByIdUseCase(leadDataSource);
const createLeadUseCase = new CreateLeadUseCase(
  leadRepository,
  eventDispatcher
);

eventDispatcher.register(LeadCreatedEvent.name, eventHandler);

describe("Lead integration", () => {
  test("find lead", async () => {
    const lead = await findLeadByIdUseCase.execute("1");
    expect(lead.id).toEqual("1");
  });

  test("create lead", async () => {
    jest.spyOn(leadDataSource, "save");
    jest.spyOn(eventDispatcher, "notify");

    await createLeadUseCase.execute({
      fullName: "John Doe",
      cpf: "12345678900",
      email: "test@test.com",
    });

    expect(leadDataSource.save).toHaveBeenCalled();
    expect(eventDispatcher.notify).toHaveBeenCalled();
  });
});
