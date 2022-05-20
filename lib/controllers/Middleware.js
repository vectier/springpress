'use strict';

class Middleware {

  constructor() {
    if (this.constructor == Middleware) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  getHandler() {
    throw new Error("Method 'getHandler()' must be implemented.");
  }

  getRegisterCondition(routeMetadata) {
    return true;
  }

}

module.exports = Middleware;
