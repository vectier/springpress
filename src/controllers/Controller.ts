import { RouteHandler } from '@/controllers/Route';
import { RouteMetadata } from '@/decorators/RouteDecorator';
import { ErrorHandler } from '@/exceptions/ErrorHandler';
import { Router } from 'express';

export class Controller {

  /**
   * Injected with {@link ControllerDecorator} on class declaration
   */
  private readonly path: string;
  private readonly router: Router = Router();
  private readonly hasAvailable: boolean;

  /**
   * Gets the modular router path of the controller instance
   * @returns a modular router path
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * @returns true if the controller specified {@link ControllerMapping}
   */
  public isAvailable(): boolean {
    return this.hasAvailable;
  }

  /**
   * Returns the modular express router of the controller instance
   * @returns The express {@link Router} instance
   */
  public getRouter(): Router {
    const routes = Reflect.getMetadataKeys(this);

    routes.forEach((route) => {
      const routeHandler: RouteHandler = ErrorHandler.wrap(this[route]);
      const routeProperty: RouteMetadata = Reflect.getMetadata(route, this);
      this.router[routeProperty.method.toLowerCase()](routeProperty.path, routeHandler);
    });

    return this.router;
  }

}
