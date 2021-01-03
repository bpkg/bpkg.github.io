---
layout : page
title  : bpkg Package Guidelines
header : Post Archive
group  : navigation
---

## Package details

Here we lay down some info on the structure of a package.

## bpkg.json

Every package must have a file called `bpkg.json`; it specifies package metadata on the [JSON format][json].
(For legacy reasons, this file may also be called `pacakge.json`).

Here's an example of a well-formed `bpkg.json`:

```json
{
  "name": "term",
  "version": "0.0.1",
  "description": "Terminal utility functions",
  "scripts": [ "term.sh" ],
  "install": "make install"
}
```

All fields are mandatory except when noted.
Here's a detailed explanation on all fields:

### name

The `name` attribute is required as it is used to tell `bpkg` where to put it in the `deps/` directory in you project.

```json
  "name": "my-script"
```

### version (optional)

The `version` attribute is not required but can be useful. It should correspond to the version that is associated with the installed package.

```json
  "version": "0.0.1"
```

### description

A human readable description of what the package offers for functionality.

```json
  "description": "This script makes monkeys jump out of your keyboard"
```

### global

Indicates that the package is only intended to be installed as a script. This allows the omission of the `-g` or `--global` flag during installation.

```json
  "global": "true"
```

### install

Shell script used to invoke in the install script. This is required if the `global` attribute is set to `true` or if the `-g` or `--global` flags are provided.

```json
  "install": "make install"
```

### scripts

This is an array of scripts that will be installed into a project.

```json
  "scripts": ["script.sh"]
```

### files

This is an array of files that will be installed into a project.

```json
  "files": ["bar.txt", "foo.txt"]
```

### dependencies (optional)

This is a hash of dependencies. The keys are the package names, and the values are the version specifiers. If you want the latest code use `'master'` in the version specifier. Otherwise, use a tagged release identifier. This works the same as `bpkg install`'s package/version specifiers.

```json
  "dependencies": {
    "term": "0.0.1"
  }
```


## Packaging best practices

These are guidelines that we strongly encourage developers to follow.

### Package exports

It's nice to have a bash package that can be used in the terminal and also be invoked as a command line function. To achieve this the exporting of your functionality *should* follow this pattern:

```sh
if [[ ${BASH_SOURCE[0]} != $0 ]]; then
  export -f my_script
else
  my_script "${@}"
  exit $?
fi
```

This allows a user to `source` your script or invoke as a script.

```sh
# Running as a script
$ ./my_script.sh some args --blah
# Sourcing the script
$ source my_script.sh
$ my_script some more args --blah
```

[json]: http://json.org/example
