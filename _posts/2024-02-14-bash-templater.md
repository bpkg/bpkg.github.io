---
layout: post
title: "bash-templater"
description: "Simplify Configuration File and Script Generation"
category: bash
tags: [bash, templates, text]
---

bash-templater empowers efficient templating within Bash scripts,
streamlining the creation of configuration files, documentation, and more.
With its intuitive syntax and powerful features, you can effortlessly craft
dynamic output.

## TL;DR

Installing:

     bpkg install vicentebolea/bash-templater

Using it:

    templater vars < file.template

## USE ME
You have this `file.template`:

```markdown
# My template
## Author
 - @NAME@ <@EMAIL@>
```
And this `rules` file:
```bash
NAME=LEOPOLDO WINSTON
EMAIL=leothewinston\@leoserver.com
```

You execute this command:
```bash
templater rules < file.template
```

You get this:
```markdown
# My template
## Author
 - LEOPOLDO WINSTON <leothewinston@leoserver.com>
```

## The only rule

Escape the `@` character like `\@` in the rules file.

## INSTALL ME
Use the fantastic BASH package manager BPKG and just:

    bpkg install vicentebolea/bash-templater

## Links

* [Source Code (GitHub)](https://github.com/vicentebolea/bpkg.github.io)
* Authors: [Vicente Adolfo Bolea Sanchez](https://github.com/vicentebolea)

{% include JB/setup %}
