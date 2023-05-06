class Mock {
  public static isValid() {
    return true;
  }

  toString() {
    return "mocked";
  }

  toJSON() {
    return "mocked";
  }

  get value() {
    return "mocked";
  }
}

export default Mock;
