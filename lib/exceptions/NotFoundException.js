'use strict';

const HttpException = require('./HttpException');

class NotFoundException extends HttpException {

  getStatusCode() {
    return 404;
  }

}

module.exports = NotFoundException;
