---
layout: post
title: "node-reinstall"
description: "Complete Node Reinstall. This deletes everything, yes everything, and re-installs Node and NPM with NVM, then re-installs global NPM modules."
category: nodejs
tags: [osx, nodejs]
---

This package re-installs Node.js and NPM using NVM or Nave.

## Usage

`node-reinstall` can typically be run as-is, though you can specify several arguments to customize to your liking.

```
$ node-reinstall
```

    completely re-installs Node & NPM and any global node modules.
    It re-installs Node using NVM or Nave

```
$ node-reinstall -h
```
    Usage:  node-reinstall [--nave|--nvm] [-h|--help] [-v|--version] [NODE_VERSION]

## Commands:

```
node-reinstall                re-install node and npm using nvm
node-reinstall -h [--help]    show help
node-reinstall -v [--version] show the node-reinstall version number
node-reinstall --nave         re-install using nave
node-reinstall --nvm          re-install using nvm (the default)
node-reinstall 0.12           specify a default node version (currently 0.10)
```

## Links

* [Source Code (Github)](https://github.com/brock/node-reinstall)
* [Author: Brock Angelo](https://github.com/brock)

