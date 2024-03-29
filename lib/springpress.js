'use strict';

/**
 * Module dependencies.
 */
require('reflect-metadata');

const Controller = require('./controllers/Controller');
const ControllerRegistry = require('./controllers/ControllerRegistry');
const Methods = require('./controllers/Methods');
const Middleware = require('./controllers/Middleware');

const ControllerDecorator = require('./decorators/ControllerDecorator');
const RequestDecorator = require('./decorators/RequestDecorator');
const RouteDecorator = require('./decorators/RouteDecorator');

const HttpException = require('./exceptions/HttpException');
const BadRequestException = require('./exceptions/BadRequestException');
const ForbiddenException = require('./exceptions/ForbiddenException');
const NotFoundException = require('./exceptions/NotFoundException');
const UnauthorizedException = require('./exceptions/UnauthorizedException');

const RouteUtil = require('./utils/RouteUtil');

const Springpress = require('./server/Server');

/**
 * Expose constructors.
 */
exports.Controller = Controller;
exports.ControllerRegistry = ControllerRegistry;
exports.Methods = Methods;
exports.Middleware = Middleware;
exports.RouteUtil = RouteUtil;
exports.Springpress = Springpress;

/**
 * Expose Decorators prototype.
 */
exports.ControllerMapping = ControllerDecorator;
exports.RequestBody = RequestDecorator;
exports.RouteMapping = RouteDecorator;

/**
 * Expose Custom Error.
 */
exports.HttpException = HttpException;
exports.BadRequestException = BadRequestException;
exports.ForbiddenException = ForbiddenException;
exports.NotFoundException = NotFoundException;
exports.UnauthorizedException = UnauthorizedException;
