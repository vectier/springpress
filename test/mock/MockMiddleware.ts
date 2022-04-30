import { Methods, Middleware, RouteHandler, RouteMetadata } from '../..';

export class MockMiddleware extends Middleware {

  public async getHandler(): Promise<RouteHandler> {
    return async (req, res, next) => {
      next();
    };
  }

}

export class MockConditionalMiddleware extends Middleware {

  public async getHandler(): Promise<RouteHandler> {
    return async (req, res, next) => {
      next();
    };
  }

  public getRegisterCondition(routeMethod: Methods, routeMetadata: RouteMetadata): boolean {
    return routeMetadata.path === '/test2';
  }

}
