---
layout: post
title: "magic-version"
description: "calculate version from CI env"
category: ci
tags: [coding, github, ci, jenkins]
---

calculate version for CI (CODING, GitHub Actions, Jenkins)

when   | version
-------|---------
tag    | 1.2.0
branch | main-3a11e12
MR     | mr-123-3a11e12
PR(GitHub) | pr-123-3a11e12

```bash
bpkg install [-g] sinkcup/magic-version
```

## Usage

```bash
export TAG_NAME=1.2.0
magic-version
```

> 1.2.0

more examples in [test code](https://github.com/sinkcup/magic-version/tree/main/test)

## Links

* [Source Code](https://github.com/sinkcup/magic-version)
* [Author: sink](https://github.com/sinkcup)

{% include JB/setup %}
