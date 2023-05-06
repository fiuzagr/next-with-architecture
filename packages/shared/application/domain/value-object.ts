abstract class ValueObject<T> {
  protected constructor(private _value: T) {}

  get value() {
    return this._value;
  }

  toJSON() {
    return JSON.parse(JSON.stringify(this.value));
  }
}

export default ValueObject;
