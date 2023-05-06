import Mock from "./value-object";

class IdMock extends Mock {
  public static generate() {
    return "generated-id";
  }
}

export default IdMock;
