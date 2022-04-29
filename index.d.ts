import http from 'http';
import { Express, NextFunction } from 'express';

export abstract class Controller {
  /**
   * Gets the modular router path of the controller instance.
   * @returns a modular router path
   */
  getPath(): string;
  /**
   * Returns the router structure with handler and metadata of the controller
   * for converting to the modular express router.
   * @returns The router structure (array of {@link Route})
   */
  getRouter(): Route[];
}

export abstract class Middleware {
  /**
   * Returns a function that have access to the request object,
   * the response object, and the next middleware function.
   */
  abstract getHandler(): Promise<RouteHandler>;
  getRegisterCondition(): MiddlewareCondition;
}

export type MiddlewareCondition = (routeMethod: Methods, routeMetadata: RouteMetadata) => boolean;

export class ControllerRegistry {
  constructor(app: Express);
  /**
   * Registers a controller instance (a class extended {@link Controller})
   * into the controller registry for routing system.
   * @param controller - A controlller instance
   * @param middlewares - A single middleware or a group of middlewares
   */
  register(controller: Controller, ...middlewares: Middleware[]);
}

/**
 * Binds the decorated controller as a modular route handler.
 * @param path - A root route path
 */
export function ControllerMapping(path: string): ClassDecorator;

/**
 * Controls the incomming request body of decorated route.
 * If the body does not match the requirement will throw {@link BadRequestException}.
 * @param keys - Required request body (starts with "?" for optional key)
 */
export function RequestBody(...keys: string[]): MethodDecorator;

/**
 * Binds the decorated method as a route handler.
 * @param path - A route path
 */
export function RouteMapping(path: string, method: Methods): MethodDecorator;

export abstract class HttpException extends Error {
  /**
   * @returns A number of http response code
   */
  abstract getStatusCode(): number;
}

/**
 * Throws a http response code 400
 */
export class BadRequestException extends HttpException {}
/**
 * Throws a http response code 403
 */
export class ForbiddenException extends HttpException {}
/**
 * Throws a http response code 404
 */
export class NotFoundException extends HttpException {}
/**
 * Throws a http response code 401
 */
export class UnauthorizedException extends HttpException {}

/**
 * Accepted http request methods
 */
export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type RouteMetadata = {
  path: string,
  method: Methods,
};

export type Route = {
  handler: RouteHandler,
  metadata: RouteMetadata,
};

export abstract class Springpress {
  constructor(port: number);
  abstract onStartup(): Promise<void>;
  /**
   * Binds the http server and return nodejs net server.
   * When invoking this method will invoke {@link Springpress.onStartup} first
   * @returns A promise of nodejs net server
   */
  listen(): Promise<http.Server>;
  /**
   * @returns A port that binds this server
   */
  getPort(): number;
  /**
   * @returns The controller registry instance
   */
  getControllerRegistry(): ControllerRegistry;
}
