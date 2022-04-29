import { Middleware, MiddlewareCondition, RouteHandler } from '../..';

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

  public getRegisterCondition(): MiddlewareCondition {
    return (routeMethod, routeMetadata) => {
      return routeMetadata.path === '/test2';
    };
  }

}
