abstract class Provider<InstancePort> {
  private static instances = new Map<string, any>();

  constructor(instance: InstancePort) {
    if (!instance) {
      throw new Error("Instance is required");
    }

    if (instance === Provider.instances.get(this.constructor.name)) {
      return Provider.instances.get(this.constructor.name);
    }

    Provider.instances.set(this.constructor.name, instance);
  }

  static getInstance(instanceName: string): any {
    const instance = Provider.instances.get(instanceName);

    if (!instance) {
      throw new Error("Provider has not been initialized");
    }

    return instance;
  }
}

export default Provider;
