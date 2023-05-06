import { IdentifierPort } from "@packages/shared";
import Provider from "./provider";

class IdentifierProvider<ValueType = string> extends Provider<
  IdentifierPort<ValueType>
> {
  static getInstance(): any {
    return super.getInstance(IdentifierProvider.name);
  }
}

export default IdentifierProvider;
