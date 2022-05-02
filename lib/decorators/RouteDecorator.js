'use strict';

const RouteUtil = require("../utils/RouteUtil");

const RouteMapping = (path, method) => {
  return RouteUtil.addRouteMetadata({ path, method });
};

module.exports = RouteMapping;
