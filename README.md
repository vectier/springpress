## node-ts-starter
This repository was built to reduce setup time of **[NodeJS](https://nodejs.org/en/)** *(16.14.0 LTS)* project
with **[TypeScript](https://www.typescriptlang.org/)** and **[webpack](https://webpack.js.org/)**.

**node-ts-starter** will serve you performance and lightweight setup for your nodejs project
which uses nodejs long-term support version, it will keep you to use new features without any concern. When the deployment time comes, ***just drag & drop then hit a single command only 🚀***.

### 📦 Requirements

- Engine
  - [NodeJS](https://nodejs.org/) 16.14.0 (LTS)
- Packages
  - [yarn](https://yarnpkg.com/) - A performance package manager
    - To install, run `corepack enable` on terminal
  - [nodemon](https://nodemon.io/) - A development monitor
    - To install, run `yarn global add nodemon` on terminal
- Tools
  - [vscode](https://code.visualstudio.com/) or [webstorm](https://www.jetbrains.com/webstorm/) - A recommended development tool 

### 🚀 Deployment

1. Build the application on your development machine by running `yarn build`.
2. Your application will bundled in `/dist` directory, you only need to copy everything from `/dist` into your `production server` by keeping it where you want to run nodejs application.
3. Run `yarn start` on your destination directory according to step 2.
4. Enjoy your juicy coffee ☕~

### ⌨️ Commands

- To start development with automatically build process and dependencies checking:  
```bash
yarn dev
```

- To build the application for production ready:
```bash
yarn build
```

- To start the application for production environment with automatically dependencies installation:
```bash
yarn start
```
