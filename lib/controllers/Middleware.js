'use strict';

class Middleware {

  constructor() {
    if (this.constructor == Middleware) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  async getHandler(routeMetadata) {
    throw new Error("Method 'getHandler()' must be implemented.");
  }

  getRegisterCondition() {
    return (routeMethod, routeMetadata) => true;
  }

}

module.exports = Middleware;
