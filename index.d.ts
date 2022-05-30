import http from 'http';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from 'express';

export abstract class Controller {
  /**
   * Gets the modular router path of the controller instance.
   * @returns a modular router path
   */
  getPath(): string;
  /**
   * Returns the router structure with handler and metadata of the controller.
   * for converting to the modular express router.
   * @returns The router structure (array of {@link Route})
   */
  getRouter(): Route[];
}

export abstract class Middleware {
  /**
   * Returns a function that have access to the request object,
   * the response object, and the next middleware function.
   * @param routeMetadata - A route metadata
   */
  abstract getHandler(routeMetadata: RouteMetadata): RouteHandler;
  /**
   * Returns a boolean represent to the middleware register condition
   * @param routeMetadata - A route metadata for conditioning
   * @returns True if a route matches the middleware register condition, otherwise returns false
   */
  getRegisterCondition(routeMetadata: RouteMetadata): boolean;
}

export class ControllerRegistry {
  constructor(app: Express);
  /**
   * Registers a controller instance (a class extended {@link Controller})
   * into the controller registry for routing system.
   * 
   * @remarks
   * The middleware run in the sequence as passed in the array.
   * 
   * @param controller - A controller instance
   * @param middleware - An array of middleware
   */
  register(controller: Controller, middleware?: Middleware[]): void;
  /**
   * Registers global middleware in the application routing.
   * @param middleware - A middleware or an array of middleware to register globally
   */
  registerGlobalMiddleware(middleware: Middleware | Middleware[]): void;
  /**
   * @returns A count of registered controller
   */
  size(): number;
}

/**
 * Binds the decorated controller as a modular route handler.
 * @param path - A root route path
 */
export function ControllerMapping(path: string): ClassDecorator;

/**
 * Controls the incoming request body of decorated route.
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
export class BadRequestException extends HttpException { }
/**
 * Throws a http response code 403
 */
export class ForbiddenException extends HttpException { }
/**
 * Throws a http response code 404
 */
export class NotFoundException extends HttpException { }
/**
 * Throws a http response code 401
 */
export class UnauthorizedException extends HttpException { }

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

export interface Request extends ExpressRequest { }

export interface Response extends ExpressResponse { }

export interface NextFunction extends ExpressNextFunction { }

export class RouteUtil {
  /**
   * Add data into the route metadata.
   * @param data - A key-value pairs of data to merge into the route metadata
   */
  static addRouteMetadata(data: Record<string, any>): MethodDecorator;
}

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
