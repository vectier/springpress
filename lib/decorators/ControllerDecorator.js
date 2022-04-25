'use strict';

const ControllerMapping = (path) => {
  return (constructor) => {
    constructor.prototype.path = path;
  };
};

module.exports = ControllerMapping;
