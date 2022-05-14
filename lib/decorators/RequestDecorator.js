'use strict';

const BadRequestException = require('../exceptions/BadRequestException');

const RequestBody = (...keys) => {
  return (target, propertyKey, descriptor) => {
    const method = target[propertyKey];

    descriptor.value = function (...args) {
      const request = args[0];

      if (request.body) {
        keys = keys.filter((key) => !key.startsWith('?'));

        const hasAllRequiredBody = keys.every((key) => request.body[key]);
        if (hasAllRequiredBody) {
          return method.apply(this, args);
        }
      }

      const firstMissingKey = keys.find((key) => !request.body[key]);
      throw new BadRequestException(`${firstMissingKey} does not specified in request body`);
    }
  };
};

module.exports = RequestBody;
