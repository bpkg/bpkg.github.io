---
layout: post
title: "bashsh"
description: "Improves your Bash scripts"
category: bash
tags: [bash]
---
Improves your Bash scripts.


Usage
-----

The following shebang

    #!/usr/bin/env bashsh-0

gives you:

* `set -e` by default:

```bash
$ echo hello ; false ; echo world
```

will only print `hello`.

* `CMD` for showing executed commands in bold on stderr:

```bash
$ CMD git status
```

* `CMD_STR` prints the string in bold on stderr and runs it with `eval`:

```bash
$ CMD_STR 'gitk --all &'
```

* `MSG` prints a remark in bold on stderr, formatted as a comment:

```bash
$ MSG hello world
```

prints `# hello world`.

* `READ_P` works like `read -p` but prints the first parameter using `MSG`:

```bash
$ READ_P 'What is your name? ' your_name
```
* `QUOTED` prints the given arguments in a way that is safe to pass to commands:

```bash
$ echo "My arguments are: $(QUOTED "$@")"
```

You can find a few examples in the examples directory.

Caveats / known limitations
---------------------------

You **cannot** just

    bpkg install bashsh

to install bashsh locally (it is forced to install globally anyway), because if you use

    #!/usr/bin/env ./relative/path/to/bashsh-0

the path of the command supplied to `env` will be interpreted as relative to the *working directory*, not to the *script's directory*.


Links
-----

* [Source Code (GitHub)](https://github.com/mcrio/bashsh)
* [Author: Felix Rabe](http://rabe.io)
