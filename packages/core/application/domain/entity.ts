import { Id } from "@packages/shared/application/domain/id";
import { EventsManager } from "@packages/core/application/events-manager";

export abstract class Entity<Props, JSONProps> extends EventsManager {
  private readonly _id: Id;

  protected constructor(private _props: Props, id: string | null | undefined) {
    super();

    this._id = new Id(id ?? Id.generate());
  }

  get id(): Id {
    return this._id;
  }

  get props(): Props {
    return this._props;
  }

  set props(props: Props) {
    this._props = props;
  }

  public toJSON(): JSONProps {
    const jsonProps = JSON.parse(JSON.stringify(this.props));

    return {
      id: this.id.toJSON(),
      ...jsonProps,
    };
  }

  public equals(entity: Entity<Props, JSONProps>) {
    return this.id.equals(entity.id);
  }
}
