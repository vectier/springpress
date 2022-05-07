# Springpress

A Top-level framework of Express.js for developing clean architecture API service, especially on [TypeScript](https://github.com/microsoft/TypeScript).

**Springpress** provides basic *Express.js* functions and MVC utilities related out of the box, lets you deep dive into the world of [OOP](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming) and the scent of our motivation, *Spring Boot*.

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



### Server

First, you need to create a main class that extends class `Springpress`. This class will store all of your things. *e.g. services, controllers, repositories initialization*.

```ts
import { Springpress } from 'springpress';

class ExampleServer extends Springpress {
  public onStartup(): Promise<void> {
    // This code will run when your start your application.
    // All of initialization should do it here.
  }
}
```

Don't forget to call `Springpress#listen` to binds and listens for connections. This method returns a [http.Server](https://nodejs.org/docs/latest-v16.x/api/http.html#class-httpserver) object (the built-in HTTP module). *You can use this instance on your testing framework to work with HTTP*.

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
  // Routes will be here.
}
```

The `@ControllerMapping` decorator will mount your class on a router with the path where you specified in the first decorator parameter. In this case, this class will be mapped with `/dog` on the router, a client can connect by `http://localhost:3000/dog`. *(port 3000 just an example)*

#### Route Mapping

Easily define your route with `@RouteMapping` decorator:

```ts
@ControllerMapping('/dog')
class DogController extends Controller {
  @RouteMapping('/name', Methods.GET) // <-- Decorator here!
  private async getNameById(req: Request, res: Response) {
    res.status(200).json({
      name: 'Doge',
    });
  }
}
```

The `@RouteMapping` decorator will mount your decorated method as a routing destination of an HTTP request.

A ControllerMapping parameter
- path - a string of route path
  - It can be anything that [Express.js](https://expressjs.com/en/4x/api.html#path-examples) support
- method - an enum of http method (You can import `Methods` from Springpress)

Now, your client will see `http://localhost:3000/dog/name` and get a response in json type like below.

```json
{
  "name": "Doge"
}
```

#### Controller Registration

Everything above in Controller section will not work if you don't register a controller object in the Server class

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

- [Submit bugs and feature request](https://github.com/riflowth/springpress/issues).
- Review [source code changes](https://github.com/riflowth/tier-discord-bot/pulls).
- Fixing issues and contributing directly to the code base by [submitting pull requests](https://github.com/riflowth/tier-discord-bot/pulls).

## License

License under the [MIT](https://github.com/riflowth/nextpress/blob/main/LICENSE) license.
