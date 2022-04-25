'use strict';

const HttpException = require('./HttpException');

class BadRequestException extends HttpException {

  getStatusCode() {
    return 400;
  }

}

module.exports = BadRequestException;
