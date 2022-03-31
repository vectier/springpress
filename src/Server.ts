import 'reflect-metadata';
import http from 'http';
import express, { Application } from 'express';
import { IndexController } from '@/controllers/IndexController';
import { ControllerRegistry } from '@/controllers/ControllerRegistry';

export class Server {

  private readonly app: Application;
  private readonly port: number;
  private readonly controllerRegistry: ControllerRegistry;

  public constructor(port: number) {
    this.app = express();
    this.port = port;
    this.controllerRegistry = new ControllerRegistry(this.app);
  }

  public run(): http.Server {
    this.controllerRegistry.loadControllers([
      new IndexController(),
    ]);

    this.app.disable('x-powered-by');

    const controllerCount = this.controllerRegistry.size();
    console.log(`Registered ${controllerCount} controller${controllerCount > 1 ? 's' : ''}`);

    return this.app.listen(this.port, this.onStartup.bind(this));
  }

  private onStartup(): void {
    console.log(`Listening on http://localhost:${this.port}/`);
  }

}
