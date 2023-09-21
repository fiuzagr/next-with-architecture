import { MethodNotImplementedError } from "@packages/core";

export abstract class ValueObject<T> {
  protected constructor(private readonly _value: T) {}

  public get value() {
    return this._value;
  }

  public static validate<ValueType>(
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

  public static isValid(_value: any) {
    throw new MethodNotImplementedError();
  }

  public static sanitize(_value: any) {
    throw new MethodNotImplementedError();
  }

  public toJSON() {
    return JSON.parse(JSON.stringify(this.value));
  }

  abstract toString(): string;
}
