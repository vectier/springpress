'use strict';

const HttpException = require('./HttpException');

class UnauthorizedException extends HttpException {

  getStatusCode() { 
    return 401;
  }

}

module.exports = UnauthorizedException;
