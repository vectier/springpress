import { Controller, ControllerMapping, Methods, RouteMapping } from '..';

describe('Test decorator ControllerMapping and RouteMapping on controller', () => {

  @ControllerMapping('/')
  class MockController extends Controller {

    @RouteMapping('/test', Methods.GET)
    private async testRoute(): Promise<void> {}

    @RouteMapping('/test2', Methods.POST)
    private async justAnotherTestRoute(): Promise<void> {}

  };

  const controller = new MockController();

  it('should set the path property correctly', () => {
    expect(controller.getPath()).toBe('/');
  });

  it('should be found path and method correctly in the metadata', () => {
    const router = controller.getRouter();

    expect(router.length).toEqual(2);
    
    expect(router[0].handler).toBeInstanceOf(Function);
    expect(router[0].metadata).toEqual({ path: '/test', method: Methods.GET });

    expect(router[1].handler).toBeInstanceOf(Function);
    expect(router[1].metadata).toEqual({ path: '/test2', method: Methods.POST });
  });

});
