'use strict';

const { Router } = require('express');
const HttpException = require('../exceptions/HttpException');

class ControllerRegistry {
  
  #app;
  #controllerByPath = new Map();

  constructor(app) {
    this.#app = app;
  }

  register(controller, ...middlewares) {
    if (this.#controllerByPath.has(controller.getPath())) {
      throw new Error('Register duplicated controller');
    }

    const router = Router();
    const routes = controller.getRouter();

    routes.forEach((route) => {
      const routeMetadata = route.metadata;
      const routeMethod = routeMetadata.method.toLowerCase();
      const routePath = routeMetadata.path;
      const routerFunction = router[routeMethod];

      const registerMiddleware = (middleware) => {
        const canRegisterMiddleware = middleware
          .getRegisterCondition()(routeMethod, routeMetadata);

        if (canRegisterMiddleware) {
          return middleware;
        }
      };

      const routeSubStack = [
        ...middlewares.map(registerMiddleware).filter(Boolean),
        route.handler,
      ].map(this.#interceptError);

      routerFunction.apply(router, [routePath, ...routeSubStack]);
    });

    this.#app.use(controller.getPath(), router);
    this.#app.use(this.#errorFallbackMiddleware);
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
