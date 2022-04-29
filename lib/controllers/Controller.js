'use strict';

class Controller {

  constructor() {
    if (this.constructor == Controller) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

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
