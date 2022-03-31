import { NextFunction, Request, Response } from 'express';
import { Controller } from '@/controllers/Controller';
import { Methods } from '@/controllers/Route';
import { NotFoundException } from '@/exceptions/NotFoundException';
import { RouteMapping } from '@/decorators/RouteDecorator';
import { ControllerMapping } from '@/decorators/ControllerDecorator';

@ControllerMapping('/')
export class IndexController extends Controller {

  @RouteMapping('/', Methods.GET)
  private async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.status(200).json({
      message: 'hello',
    });
  }

  @RouteMapping('/404', Methods.GET)
  private async notFound(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new NotFoundException('test');
  }

  @RouteMapping('/500', Methods.GET)
  private async throwError(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('test');
  }

}
