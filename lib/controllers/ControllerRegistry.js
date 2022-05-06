'use strict';

const { Router } = require('express');
const HttpException = require('../exceptions/HttpException');

class ControllerRegistry {
  
  #app;
  #controllers = [];

  constructor(app) {
    this.#app = app;
  }

  register(controller, ...middlewares) {
    const router = Router();
    const controllerPath = controller.getPath();
    const routes = controller.getRouter();

    if (process.env.NODE_ENV !== 'production' && this.#controllers.includes(controllerPath)) {
      const controllerName = controller.constructor.name;
      console.warn(`Register duplicated controller: ${controllerPath} in ${controllerName}`);
    }

    routes.forEach((route) => {
      const routeMetadata = route.metadata;
      const routeMethod = routeMetadata.method.toLowerCase();
      const routePath = routeMetadata.path;
      const routerFunction = router[routeMethod];

      const registerMiddleware = (middleware) => {
        const canRegisterMiddleware = middleware
          .getRegisterCondition(routeMethod, routeMetadata);

        if (canRegisterMiddleware) {
          return middleware.getHandler(routeMetadata);
        }
      };

      const routeSubStack = [
        ...middlewares.map(registerMiddleware).filter(Boolean),
        route.handler,
      ].map(this.#interceptError);

      routerFunction.apply(router, [routePath, ...routeSubStack]);
    });

    this.#app.use(controllerPath, router);
    this.#app.use(this.#errorFallbackMiddleware());
    this.#controllers.push(controllerPath);
  }

  size() {
    return this.#controllers.length;
  }

  #interceptError(routeHandler) {
    return async (req, res, next) => {
      try {
        await routeHandler(req, res, next);
      } catch (error) {
        next(error);
      };
    }
  };

  #errorFallbackMiddleware() {
    // Rearrange previous express router layer stack
    const stack = this.#app._router.stack;
    const targetLayer = ['errorHandler', 'notFoundHandler'];
    let i = 0;
    while (i < stack.length) {
      const stackName = stack[i].name;
      if (targetLayer.includes(stackName)) {
        stack.splice(i, 1);
      } else {
        ++i;
      }
    }

    // Initialize new error fallback layer stack
    const errorHandler = (error, req, res, next) => {
      const statusCode = (error instanceof HttpException)
        ? error.getStatusCode()
        : 500;

      res
        .status(statusCode)
        .json({
          error: error.name,
          message: error.message,
          timestamp: new Date(),
        })
    };
    const notFoundHandler = (req, res) => {
      res
        .status(404)
        .json({
          path: req.baseUrl + req.path,
          message: 'Cannot find the requested resource'
        });
    };

    return [errorHandler, notFoundHandler];
  }

}

module.exports = ControllerRegistry;
