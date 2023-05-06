interface UseCasePort<Input, Output> {
  execute(input: Input): Promise<Output>;
}

export default UseCasePort;
