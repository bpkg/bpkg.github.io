---
layout: page
title: Home
tabtitle: bpkg home
tagline: Supporting tagline
---
{% include JB/setup %}

## bpkg is a _bash package manager_

_JavaScript has [npm][npm], Ruby has [Gems][gem], Python has [pip][pip] and now
Shell has bpkg!_

With **bpkg** you can easily install and manage Bash packages.

It takes care of installing/uninstalling, execution permissions and everything
so you can simply do the following:

{% highlight bash %}
# Installs `term` on `/usr/local/bin` (https://github.com/bpkg/term)
$ bpkg install term -g
$ term
{% endhighlight %}

Besides installing shell scripts globally you can use them on a _per-project
basis_.

{% highlight bash %}
# Installs `term` under the `deps/` directory
$ bpkg install term
$ ./deps/term/term.sh
{% endhighlight %}

## Install

You can install **bpkg** from 3 methods:

### 1. Install Script

Our custom install script will take care of everything for you.
Just paste the following on your shell:

{% highlight bash %}
$ curl -Lo- https://raw.githubusercontent.com/bpkg/bpkg/master/install.sh | bash
{% endhighlight %}

### 2. clibs

[clibs][clib] is a great package manager for the C language. If you have it,
installing **bpkg** is as simple as:

{% highlight bash %}
$ clib install bpkg/bpkg
{% endhighlight %}

### 3. Source Code

If you prefer to handle source code, clone **bpkg**'s repository and install it
on the following way:

{% highlight bash %}
$ git clone https://github.com/bpkg/bpkg.git
$ cd bpkg
$ make install
{% endhighlight %}

[gem]: https://rubygems.org/
[npm]: https://www.npmjs.org/
[pip]: https://pypi.python.org/pypi/pip
[clib]: https://github.com/clibs/clib

