---
layout: post
title: "tldr bash client"
description: "Display tldr pages: community driven man-by-example"
category: default
tags: [color, github, docs, client, markdown, bash]
---
{% include JB/setup %}
Source code repo: https://github.com/pepa65/tldr-bash-client
Author: pepa65 <solusos@passchier.net>

# tldr-bash-client

**A fully-functional [bash](https://tiswww.case.edu/php/chet/bash/bashtop.html)
client for the [tldr](https://github.com/rprieto/tldr/) project, providing
poignant examples of terminal commands.**

## Installation

Download the tldr bash script to the install location:

```bash
location=/usr/local/bin/tldr  # elevated privileges needed for some locations
sudo wget -qO $location https://raw.githubusercontent.com/pepa65/tldr-bash-client/master/tldr
sudo chmod +x $location
```

If the location is not in $PATH, you need to specify the path to run it.

### Prerequisites
coreutils, less, grep, unzip, curl / wget

## Usage

```
 USAGE: tldr [option] [platform/]<command>

 platform/command:           Show page for command (from platform)

 platform is optionally one of: common, linux, osx, sunos

 option is optionally one of:
  -l, --list [platform]:      Show all available pages (from platform)
  -r, --render <file>:        Render a local file as tldr markdown
  -m, --markdown <command>:   Show the markdown source for command
  -c, --cache:                Cache all pages by downloading archive from repo
  -u, --update:               Re-download index file from repo
  [-h, -?, --help]:           This help overview

 All pages and the index are cached locally under ~/.config/tldr.
 By default, the cached copies will be re-downloaded after 60 days.
```

## Customisation
The colors and other styling of the 5 elements of tldr pages can be modified
either by editing the first few lines of the scipt, or by setting the following
environment variables:
* TLDR_TITLE_STYLE (defaults to: Newline Space Bold Yellow)
* TLDR_DESCRIPTION_STYLE (defaults to: Space Yellow)
* TLDR_EXAMPLE_STYLE (defaults to: Newline Bold Green)
* TLDR_CODE_STYLE (defaults to: Space Bold Blue)
* TLDR_VALUE_STYLE (defaults to: Bold Cyan)

Also the error color and page expiry can easily be set:
* TLDR_ERROR_COLOR (defaults to: Red)
* TLDR_EXPIRY (defaults to: 60)

## Contributing

Please file an issue for a question, a bug or a feature request.
Or even better, send a pull request!

### License

Relicensed under GPL v3+
