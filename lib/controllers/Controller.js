'use strict';

class Controller {

  getPath() {
    return this.path;
  }

  getRouter() {
    const routes = Reflect.getMetadataKeys(this);
    const router = routes.map((route) => {
      return {
        handler: this[route].bind(this),
        metadata: Reflect.getMetadata(route, this),
      };
    });
    return router;
  }

}

module.exports = Controller;
