import { HttpException } from '@/exceptions/HttpException';

export class NotFoundException extends HttpException {

  public getStatusCode(): number {
    return 404;
  }

}
