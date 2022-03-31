/* eslint-disable no-param-reassign */

export const ControllerMapping = (path: string): ClassDecorator => {
  return (
    constructor: Function,
  ): any => {
    constructor.prototype.path = path;
    constructor.prototype.hasAvailable = true;
  };
};

export const UnavailableController = (constructor: Function): void => {
  constructor.prototype.hasAvailable = false;
};
