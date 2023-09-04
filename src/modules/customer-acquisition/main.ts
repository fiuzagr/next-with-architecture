import {
  CreateCustomerByLeadEventHandlerAdapter,
  CreateCustomerUseCase,
  CreateLeadUseCase,
  CustomerCreatedEvent,
  CustomerDTO,
  CustomerRepository,
  FakeLeadDataSource,
  FilterLeadsUseCase,
  FindLeadByIdUseCase,
  IndexedDbDataSource,
  LeadCreatedEvent,
  LeadDTO,
  LeadRepository,
  LeadUpdatedEvent,
  UpdateLeadUseCase,
} from "@packages/customer-acquisition";
import { IdentifierProvider, LoggerProvider } from "@packages/core";
import {
  ConsoleLoggerAdapter,
  EventDispatcherAdapter,
  LoggerEventHandlerAdapter,
  UuidIdentifierAdapter,
} from "@packages/shared";
import {
  consoleLoggerSettings,
  isBrowser,
} from "@/modules/customer-acquisition/configs";
import * as localforage from "localforage";

const logger = new ConsoleLoggerAdapter(consoleLoggerSettings);
//const identifier = new FakeIdentifierAdapter();
const identifier = new UuidIdentifierAdapter();

const loggerProvider = new LoggerProvider(logger);
const identifierProvider = new IdentifierProvider(identifier);

const loggerEventHandler = new LoggerEventHandlerAdapter(logger);
const eventDispatcher = new EventDispatcherAdapter();
//const leadDataSource =
//isBrowser && window.localStorage
//? new BrowserStorageLeadDataSource(window.localStorage)
//: new FakeLeadDataSource();
const leadStorage = isBrowser
  ? localforage.createInstance({
      name: "leads",
    })
  : null;
const leadDataSource = leadStorage
  ? new IndexedDbDataSource<LeadDTO>(leadStorage)
  : new FakeLeadDataSource();
const leadRepository = new LeadRepository(leadDataSource);
const findLeadByIdUseCase = new FindLeadByIdUseCase(leadDataSource);
const filterLeadsUseCase = new FilterLeadsUseCase(leadDataSource);
const createLeadUseCase = new CreateLeadUseCase(
  leadRepository,
  eventDispatcher
);
const updateLeadUseCase = new UpdateLeadUseCase(
  leadRepository,
  eventDispatcher
);

const customerStorage = localforage.createInstance({
  name: "customer",
});
const customerDataSource = new IndexedDbDataSource<CustomerDTO>(
  customerStorage
);
const customerRepository = new CustomerRepository(customerDataSource);
const createCustomerUseCase = new CreateCustomerUseCase(
  customerRepository,
  eventDispatcher
);
const createCustomerEventHandler = new CreateCustomerByLeadEventHandlerAdapter(
  createCustomerUseCase,
  logger
);

eventDispatcher.register(
  [LeadCreatedEvent.name, LeadUpdatedEvent.name, CustomerCreatedEvent.name],
  loggerEventHandler
);
eventDispatcher.register([LeadCreatedEvent.name], createCustomerEventHandler);

export {
  createLeadUseCase,
  findLeadByIdUseCase,
  filterLeadsUseCase,
  updateLeadUseCase,
};
