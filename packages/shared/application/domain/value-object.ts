abstract class ValueObject<T> {
  protected constructor(private _value: T) {}

  get value() {
    return this._value;
  }

  static validate<ValueType>(
    AnyValueObject: new (_value: ValueType) => ValueObject<ValueType>,
    value: ValueType
  ) {
    try {
      new AnyValueObject(value);
    } catch (error) {
      return error;
    }
  }

  toJSON() {
    return JSON.parse(JSON.stringify(this.value));
  }
}

export default ValueObject;
