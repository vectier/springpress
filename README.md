# Springpress

A Top-level framework of Express.js for developing clean architecture API service, especially on [TypeScript](https://github.com/microsoft/TypeScript).

**Springpress** provides basic *Express.js* functions and MVC utilities related out of the box. Let you deep-dive into the world of [OOP](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming) and the scent of our motivation, *Spring Boot* with **Springpress**.

## Installation

> **Node.js 16.15.0 (LTS) is required**

Using npm:
```
$ npm install springpress
```

Using yarn:
```
$ yarn add springpress
```

## Usage

*Assume you are creating a dog controller that sends a response of the dog's name when requesting to `/dog/name`.*

### Server

First, you need to create a main class that extends `Springpress` class. This class will store all of your things. *e.g. services, controllers, repositories initialization*.

```ts
import { Springpress } from 'springpress';

class ExampleServer extends Springpress {

  public onStartup(): Promise<void> {
    // This code will run when your start your application.
    // All of initialization should do it here.
  }

}
```

Don't forget to call `Springpress#listen` to bind and listen for connections. This method returns an [http.Server](https://nodejs.org/docs/latest-v16.x/api/http.html#class-httpserver) object (the built-in HTTP module). *You can use this instance in your testing framework to work with HTTP*.

```ts
const port = 3000; // you can specify whatever port you want :)
const exampleServer = new ExampleServer(port);
exampleServer.listen();
```

### Controller

#### Controller Mapping

Easily define your controller with `@ControllerMapping` decorator:

```ts
@ControllerMapping('/dog') // <-- Decorator here!
class DogController extends Controller {
  // Routes implementation will be here.
}
```

The `@ControllerMapping` decorator will mount your class on a router with the path where you specified in the first decorator parameter. In this case, this class will be mapped with `/dog` on the router.

- A client can connect by `http://localhost:3000/dog/` followed by your implemented route. *(port 3000 is just an example)*
- On this step, you will not actually be able to access it. You need to implement a route first by following the next step.

#### Route Mapping

Easily define your route with `@RouteMapping` decorator:

```ts
@ControllerMapping('/dog')
class DogController extends Controller {

  @RouteMapping('/name', Methods.GET) // <-- Decorator here!
  private async getName(req: Request, res: Response) {
    res.status(200).json({
      name: 'Doge',
    });
  }

}
```

The `@RouteMapping` decorator will mount your decorated method as a routing destination of an HTTP request in a controller.

A RouteMapping parameter
- path - a string of route path
  - It can be anything that [Express.js](https://expressjs.com/en/guide/routing.html) routing support
- method - an enum of HTTP method (You can use `Methods` imported from Springpress)

Now, your client will see `http://localhost:3000/dog/name` and get a response like below in a JSON format.

```json
{
  "name": "Doge"
}
```

#### Controller Registration

Everything above in the Controller section will not work if you haven't registered the controller in the Server class.

```ts
import { Springpress } from 'springpress';
import { DogController } from './controllers/DogController';

class ExampleServer extends Springpress {

  public onStartup(): Promise<void> {
    // Don't forget here!
    const controllerRegistry = this.getControllerRegistry();
    controllerRegistry.register(new DogController());
  }

}
```

## Contribution

There are many ways in which you can participate in this project, for example:

- [Submit bugs and feature requests](https://github.com/riflowth/springpress/issues).
- Review [source code changes](https://github.com/riflowth/tier-discord-bot/pulls).
- Fixing issues and contributing directly to the code base by [submitting pull requests](https://github.com/riflowth/tier-discord-bot/pulls).

## License

Copyright (c) Vectier. All rights reserved.

Licensed under the [MIT](https://github.com/riflowth/nextpress/blob/main/LICENSE) license.
