import express, { Express } from 'express';
import { ControllerRegistry } from '..';
import { MockIndexController, MockTestController } from './mock/MockController';
import { MockConditionalMiddleware, MockMiddleware } from './mock/MockMiddleware';

describe('Test the ControllerRegistry class implementation', () => {

  let expressApp: Express;
  let controllerRegistry: ControllerRegistry;

  beforeEach(() => {
    expressApp = express();
    controllerRegistry = new ControllerRegistry(expressApp);
  });

  it('should registered the mock controllers correctly', () => {
    controllerRegistry.register(new MockIndexController());
    expect(findRouter(expressApp).length).toBe(1);

    controllerRegistry.register(new MockTestController());
    expect(findRouter(expressApp).length).toBe(2);
  });

  it('should registered the mock controller and the middleware correctly', () => {
    let router, routes;

    // Unconditional middleware means this middleware should register for all routes.
    // NOTE:
    // - Expect 2 means the stack has middleware function and route handler function.
    controllerRegistry.register(new MockIndexController(), new MockMiddleware());
    router = findRouter(expressApp);
    routes = router[0].handle.stack;
    routes.forEach((layer: any) => expect(layer.route.stack.length).toBe(2));

    // Conditional middleware means this middleware should register on specified condition routes.
    // NOTE:
    // - MockConditionalMiddleware register middleware only on route path equal to '/test2'.
    // - In MockTestController has only 1 route path named 'test2'.
    // - Expect 1 means the stack has only route handler function.
    // - Expect 2 means the stack has middleware function and route handler function.
    controllerRegistry.register(new MockTestController(), new MockConditionalMiddleware());
    router = findRouter(expressApp);
    routes = router[1].handle.stack;
    expect(routes.find((layer: any) => layer.route.path === '/test').route.stack.length).toBe(1);
    expect(routes.find((layer: any) => layer.route.path === '/test2').route.stack.length).toBe(2);
  });

  it('should return a registered controller count correctly', () => {
    controllerRegistry.register(new MockIndexController());
    controllerRegistry.register(new MockTestController(), new MockMiddleware());
    expect(controllerRegistry.size()).toBe(2);
  });

});

const findRouter = (expressApp: Express) => {
  return expressApp._router.stack.filter((layer: any) => layer.name === 'router');
};
