'use strict';

class HttpException extends Error {
  
  constructor(message) {
    super(message);
    this.name = this.constructor.name;

    if (this.constructor == HttpException) {
      throw new Error("Abstract classes can't be instandtiated.");
    }
  }

  getStatusCode() {
    throw new Error("Method 'getStatusCode()' must be implemented.");
  }

}

module.exports = HttpException;
