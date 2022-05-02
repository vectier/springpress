'use strict';

class RouteUtil {

  static addRouteMetadata(data) {
    return (target, propertyKey, descriptor) => {
      Reflect.defineMetadata(propertyKey, {
        ...Reflect.getMetadata(propertyKey, target),
        ...data,
      }, target);
    };
  }

}

module.exports = RouteUtil;
