import { Middleware, RouteHandler, RouteMetadata } from '../..';

export class MockMiddleware extends Middleware {

  public getHandler(routeMetadata: RouteMetadata): RouteHandler {
    return async (req, res, next) => {
      next();
    };
  }

}

export class MockConditionalMiddleware extends Middleware {

  public getHandler(routeMetadata: RouteMetadata): RouteHandler {
    return async (req, res, next) => {
      next();
    };
  }

  public getRegisterCondition(routeMetadata: RouteMetadata): boolean {
    return routeMetadata.path === '/test2';
  }

}

export class PingPongMiddleware extends Middleware {

  public getHandler(routeMetadata: RouteMetadata): RouteHandler {
    return async (req, res, next) => {
      res.header('ping', 'pong');
      next();
    };
  }

}
