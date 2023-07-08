---
layout: post
title: "protobuf-parser"
description: "A Protobuf parser, encoder and decoder in Bash."
category: bash
tags: [library, lib, bash, parser, protobuf]
source code link: https://github.com/lafkpages/protobuf-parser-bash
author: LuisAFK <soy.lafk+pbfbpkg@gmail.com>
---

{% include JB/setup %}

# protobuf-parser

A Protobuf parser, encoder and decoder in Bash.

## Install

You'll need `protoc` for running some of the test scripts, but of course
you can use the library without it.

To install this package, run:

```bash
bpkg install lafkpages/protobuf-parser-bash
```

## Usage

Then, to lex and parse a `.proto` file, run:

```bash
./src/main.sh <path-to-proto-file>
```

You can try it with the [`test/example.proto`](#test/example.proto) file:

```bash
./src/main.sh test/example.proto
```

## Links

- [Source code (GitHub)](https://github.com/lafkpages/protobuf-parser-bash)
- [Author: LuisAFK](https://github.com/lafkpages)
