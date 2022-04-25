'use strict';

const HttpException = require('./HttpException');

class ForbiddenException extends HttpException {

  getStatusCode() {
    return 403;
  }

}

module.exports = ForbiddenException;
