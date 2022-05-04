import { Controller, ControllerMapping, Methods, Request, Response, RouteMapping } from '../..';

@ControllerMapping('/')
export class MockIndexController extends Controller {

  @RouteMapping('/test', Methods.GET)
  private async testRoute(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: 'test' });
  }

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
