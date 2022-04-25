'use strict';

const express = require("express");

class Springpress {
 
  #app;
  #port;

  constructor(port) {
    if (this.constructor == Springpress) {
      throw new Error("Abstract classes can't be instandtiated.");
    }

    this.#app = express();
    this.#port = port;
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

}

module.exports = Springpress;
