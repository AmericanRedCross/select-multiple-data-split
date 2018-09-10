## Overview
This is a desktop application developed using electron framework. Electron is a flexible and platform independent desktop application development framework utilizing the power of NodeJS.
Applications such as Slack, WordPress Desktop, WhatsApp Desktop and many more have been developed using electron. 

`select-multiple-data-split` is an app the takes CSV file as a input and slit it based on the fields selected. 
Find the test CSV file on the project root directory to test the application.

### Build and Release:
- Navigate to the root of the project directory
Run following command to test the application
```
npm install
npm run electron

```
- Install Electron Packager
This module requires Node.js 4.0 or higher to run.
```
# for use in npm scripts
npm install electron-packager --save-dev

# for use from cli
npm install electron-packager -g
```

- Build the release for macOS
```
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=img/logo.icns --prune=true --out=<path where you want to generate the package>
```
- Build the release package for windows
```
electron-packager . --platform=win32 --out=c:\release --icon=img/logo.ico
```

There are many ways to generate OS specific packages:
See [electron-packager](https://github.com/electron-userland/electron-packager)


