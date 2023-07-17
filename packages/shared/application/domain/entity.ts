import Id from "@packages/shared/application/domain/id";
import EventsManager from "@packages/shared/application/events-manager";

abstract class Entity<Props, JSONProps> extends EventsManager {
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

  toJSON(): JSONProps {
    const jsonProps = JSON.parse(JSON.stringify(this.props));

    return {
      id: this.id.toJSON(),
      ...jsonProps,
    };
  }
}

export default Entity;
