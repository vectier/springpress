import { NextFunction, Request, Response } from 'express';

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
