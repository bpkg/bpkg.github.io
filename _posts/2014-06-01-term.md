---
layout: post
title: "term"
description: "Terminal fun written in bash inspired by clibs/term"
category: default
tags: [animation, color]
---


This package allows you to manipulate colors, cursor position and make animations on the terminal.

{% highlight bash %}
$ bpkg install -g term
{% endhighlight %}

## Usage

`term` works by accepting commands, just like `git`.

{% highlight bash %}
# It's supposed to output green-ish underlined text
$ { term color green; } && { term underline; } && { echo heyaaaa; }
heyaaaa
{% endhighlight %}

### term's API

{% highlight bash %}
usage: term [-hV] <command> [args]

commands:

write <code>           Write a terminal escape code
cursor <op>            Perform operation to cursor
color <color>          Set terminal color by name (See colors)
background <color>     Set terminal background by name (See colors)
move <x> <y>           Move to (x, y)
transition <x> <y>     Transition to (x, y)
clear <section>        Clear terminal section by name (See sections)
reset                  Reset the terminal escape code sequence
bright                 Write bright escape code
dim                    Write dim escape code
underline              Write underline escape code
blink                  Write blink escape code
reverse                Write reverse escape code
hidden                 Write hidden escape code

colors:

black                  $ term color black
red                    $ term color red
green                  $ term color green
yellow                 $ term color yellow
blue                   $ term color blue
magenta                $ term color magenta
cyan                   $ term color cyan
white                  $ term color white
gray|grey              $ term color gray

sections:

start                  Start of line
end                    End of line
up                     Upper section
down                   Lower section
line                   Current line
screen                 Entire screen
{% endhighlight %}

## Links

* [Source Code (GitHub)](https://github.com/bpkg/term);
* [Author: Joseph Werle](https://github.com/jwerle);

