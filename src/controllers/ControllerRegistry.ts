import { Controller } from '@/controllers/Controller';
import { DuplicatedControllerException } from '@/exceptions/controller/DuplicatedControllerException';
import { UnavailableControllerException } from '@/exceptions/controller/UnavailableControllerException';
import { ErrorHandler } from '@/exceptions/ErrorHandler';
import { Application } from 'express';

export class ControllerRegistry {

  private readonly app: Application;
  private readonly controllerByPath: Map<String, Controller> = new Map();

  public constructor(app: Application) {
    this.app = app;
  }

  /**
   * Loads all specified available controllers into the router and registry,
   * which means the controller has provided {@link ControllerMapping}
   * not {@link UnavailableController} or doesn't provide any mentioned decorators.
   *
   * @remarks
   * This method should only register an available controller to represent all available routes.
   * It's fine to leave unavailable routes provided {@link UnavailableController} in the source code
   * without registering and HTTP accessibility to prepare for any feature release.
   *
   * @param controllers - The array of available controller to load into the registry.
   *
   * @throws {@link UnavailableControllerException} if some controllers are unavailable
   * @throws {@link DuplicatedControllerException} if some controllers have duplicated route
   */
  public loadControllers(controllers: Array<Controller>): void {
    if (controllers.some((controller) => !controller.isAvailable())) {
      // TODO: list unavailable controller
      throw new UnavailableControllerException('Can not load an unavailable controller');
    }

    if (controllers.length !== new Set(controllers).size) {
      // TODO: list duplicated controller
      throw new DuplicatedControllerException('Some controllers have duplicated route');
    }

    controllers.forEach((controller) => {
      this.app.use(controller.getPath(), controller.getRouter());
      this.controllerByPath.set(controller.getPath(), controller);
    });

    this.app.use(ErrorHandler.getHandler());
  }

  /**
   * @returns A count of registered controllers
   */
  public size(): number {
    return this.controllerByPath.size;
  }

}
