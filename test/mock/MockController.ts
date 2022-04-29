import { Controller, ControllerMapping, Methods, RouteMapping } from '../..';

@ControllerMapping('/')
export class MockIndexController extends Controller {

  @RouteMapping('/test', Methods.GET)
  private async testRoute(): Promise<void> {}

  @RouteMapping('/test2', Methods.POST)
  private async justAnotherTestRoute(): Promise<void> {}

};

@ControllerMapping('/test')
export class MockTestController extends Controller {

  @RouteMapping('/test', Methods.GET)
  private async testRoute(): Promise<void> {}

  @RouteMapping('/test2', Methods.POST)
  private async justAnotherTestRoute(): Promise<void> {}

};
