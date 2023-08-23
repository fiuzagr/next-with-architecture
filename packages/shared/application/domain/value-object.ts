export abstract class ValueObject<T> {
  protected constructor(private readonly _value: T) {}

  get value() {
    return this._value;
  }

  static validate<ValueType>(
    AnyValueObject: new (_value: ValueType) => ValueObject<ValueType>,
    value: ValueType
  ): Error | undefined {
    try {
      new AnyValueObject(value);
      return;
    } catch (error) {
      return error as Error;
    }
  }

  toJSON() {
    return JSON.parse(JSON.stringify(this.value));
  }
}
