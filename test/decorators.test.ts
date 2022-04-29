import { Methods } from '..';
import { MockIndexController } from './mock/MockController';

describe('Test decorator ControllerMapping and RouteMapping on controller', () => {

  const controller = new MockIndexController();

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
