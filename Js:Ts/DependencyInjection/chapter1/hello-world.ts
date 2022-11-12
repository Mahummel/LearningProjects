export interface IMessageWriter {
  Write(message: string): void;
}

interface IIdentity {
  isAuthenticated: boolean;
}

class SecureMessageWriter implements IMessageWriter {
  private readonly writer: IMessageWriter;
  private readonly identity: IIdentity;
  constructor(writer: IMessageWriter, identity: IIdentity) {
    if (!writer) throw new Error("Null writer exception");
    if (!identity) throw new Error("Null identity exception");
    this.writer = writer;
    this.identity = identity;
  }
  Write(message: string): void {
    if (this.identity.isAuthenticated) this.writer.Write(message);
  }
}

class ConsoleMessageWriter implements IMessageWriter {
  Write(message: string): void {
    console.log(message);
  }
}

export class Salutation {
  private readonly writer: IMessageWriter;
  constructor(writer: IMessageWriter) {
    if (!writer) throw new Error("Null exception, no writer");
    this.writer = writer;
  }
  public Exclaim(): void {
    this.writer.Write("Hello World");
  }
}

/**
 * Main class to implement DI example for hello world
 */
class Main {
  private authentication: IIdentity = {
    isAuthenticated: true,
  }
  private writer: IMessageWriter = new SecureMessageWriter(
    new ConsoleMessageWriter(),
    this.authentication,
  )

  public execute(): void {
    this.writer.Write("hello");
  }
}