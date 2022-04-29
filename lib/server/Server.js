'use strict';

const express = require('express');
const ControllerRegistry = require('../controllers/ControllerRegistry');

class Springpress {
 
  #app;
  #port;
  #controllerRegistry;

  constructor(port) {
    if (this.constructor == Springpress) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.#app = express();
    this.#port = port;
    this.#controllerRegistry = new ControllerRegistry(this.#app);
  }

  async onStartup() {
    throw new Error("Method 'onStartup()' must be implemented.");
  }

  async listen() {
    await this.onStartup();

    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.json());
    this.#app.disable('x-powered-by');

    return this.#app.listen(this.#port);
  }

  getPort() {
    return this.#port;
  }

  getControllerRegistry() {
    return this.#controllerRegistry;
  }

}

module.exports = Springpress;
