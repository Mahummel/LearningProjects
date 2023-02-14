interface getSet<T> {
  data: T;
  get: () => T;
  set: (data: T) => void; 
}

interface Guid extends getSet<string> {
  uuid: string
}

export class Product {
  public id: Guid;
  public name: getSet<string>;
  public description: getSet<string>;
  public unitPrice: getSet<number>;
  public isFeatured: getSet<boolean>;
}

export class CommerceContext {
  public dbSet: getSet<Product>;
  public test() {
    const test = this.dbSet.get();
    this.dbSet.set({
      id: "",
      name: "",
      descriptions
    })
  }
}