import { Methods, Middleware, RouteHandler, RouteMetadata } from '../..';

export class MockMiddleware implements Middleware {

  public getHandler(): RouteHandler {
    return async (req, res, next) => {
      next();
    };
  }

  public getRegisterCondition(routeMethod: Methods, routeMetadata: RouteMetadata): boolean {
    return true;
  }

}

export class MockConditionalMiddleware implements Middleware {

  public getHandler(): RouteHandler {
    return async (req, res, next) => {
      next();
    };
  }

  public getRegisterCondition(routeMethod: Methods, routeMetadata: RouteMetadata): boolean {
    return routeMetadata.path === '/test2';
  }

}
