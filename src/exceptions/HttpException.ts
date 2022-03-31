export abstract class HttpException extends Error {

  public constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  public abstract getStatusCode(): number;

}
