import { equal } from "assert";
import { IMessageWriter, Salutation } from "./hello-world";

interface IWrittenMessage {
  message: string;
  get: () => string;
  set: (message: string) => void;
}

class SpyMessageWriter implements IMessageWriter {
  public WrittenMessage: IWrittenMessage = {
    message: '',
    get: (): string => this.WrittenMessage.message,
    set: (newMessage: string): void => { this.WrittenMessage.message = newMessage },
  }

  public Write(message: string): void {
    this.WrittenMessage.set(message);
  }
}

function ExclaimWillWriteCorrectMessageToMessageWriter() {
  const writer = new SpyMessageWriter();
  const sut = new Salutation(writer);
  sut.Exclaim();
  equal(writer.WrittenMessage.get(), 'Hello World');
}

ExclaimWillWriteCorrectMessageToMessageWriter();
