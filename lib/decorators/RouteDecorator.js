'use strict';

const RouteMapping = (path, method) => {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata(propertyKey, {
      ...Reflect.getMetadata(propertyKey, target),
      path,
      method,
    }, target);
  };
};

module.exports = RouteMapping;
