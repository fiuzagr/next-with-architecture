interface IdentifierPort<Value = string> {
  generate(...args: any[]): Value;

  validate(value: Value): boolean;
}

export default IdentifierPort;
