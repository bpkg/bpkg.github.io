---
layout: post
title: "records.sh"
description: "A small logging library for bash. Supports `cli`, `json`, `logfmt`, and custom formats. Integrates with journald and Github actions."
category: bash
tags: [library, logging]
---

See https://github.com/orbit-online/records.sh for the full README and more
advanced use-cases.

## Usage

Source the script with `source "records.sh"` and log messages with the
lowercased loglevel as the function name:

```
debug 'Starting up.'
verbose 'Startup completed'
info 'Hello world!'
warning 'Careful!'
error 'Oh no!'
```

The method signature of the logging functions mimic that of `printf`:
`info FORMAT [ARGS...]`. Which means you can format variables.

```
$ var=0x1f
$ info "The decimal version of %s is %d" "$var" "$var"
example.sh: The decimal version of 0x1f is 31
```

All log messages are output to stderr. If you want to log something to stdout
simply run e.g. `info 'message' 2>&1`.

## Links

- [Source Code (GitHub)][https://github.com/orbit-online/records.sh]
- [Author: Orbit Online A/S (Anders Ingemann)](https://orbit.online)

{% include JB/setup %}
