'use strict';

class HttpException extends Error {
  
  constructor() {
    if (this.constructor == HttpException) {
      throw new Error("Abstract classes can't be instandtiated.");
    }
  }

  getStatusCode() {
    throw new Error("Method 'getStatusCode()' must be implemented.");
  }

}

module.exports = HttpException;
