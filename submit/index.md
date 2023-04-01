---
layout : page
title  : Submit your Package
header : Post Archive
group  : navigation
---

If you **already have created a package** that follows [bpkg's package guidelines][guide], then it would be great to list it on our site!

On a few words, you have to submit a pull request with your package information to [our website's repository][site].

Here's a step-by-step guide:

## 1. Fork the website repository

Click: [Fork bpkg on github](https://github.com/bpkg/bpkg.github.io/fork)

If you don't have a github account yet, you will need to create one.

## 2. Clone the website repository

The following commands will download our website under a directory called `bpkg.github.io` and then navigate to it.

{% highlight bash %}
$ git clone https://github.com/bpkg/bpkg.github.io
$ cd bpkg.github.io
{% endhighlight %}

Then, **make sure to create a branch for your package**. The following command does just that:

{% highlight bash %}
$ git checkout -b your-package-name
{% endhighlight %}

## 3. Add your project to it

The command below will create a file on which you must enter your project's metadata. When you execute it, it will say which file you must edit.

Replace `PACKAGE_NAME` by your package name.

{% highlight bash %}
$ rake post title="PACKAGE_NAME"
Creating new post: ./_posts/2014-06-02-package-name.md
{% endhighlight %}

Open the file that the previous command told you to.

There, it'll have this format:

    layout: post
    title: "PACKAGE_NAME"
    description: ""
    category:
    tags: []
    ---

You must provide at least the following:

* **title**: Name of your package, in a UNIX-like form.
  For example `this-name` is acceptable and `This Name` not.
* **description**: One-line summary of what your package does.
* **category**: Pick **one** of [all categories](/packages/category) that best suit your package.
* **tags**: Several tags that give a clue on what your package is about. It must have `[this, format]`.
 [Here's a list of all tags](/packages/tag). You can create your own, although we encourage you to pick already-existing ones.
* **source code link**: _Append a line_ and put a link to the package's source code repository.
* **author**: _Append another line_ and place your name along with at least one contact info (homepage, email, twitter).

**Note:** Don't change the other lines as it might break something.

Optionally you can _tell us more about the package_. Make sure to write text in Markdown format and place it **under** the last line.

A _sample package information_ file would be like this:

    layout: post
    title: "fortune-fun"
    description: "like 'fortune' but way cooler"
    category: game
    tags: [fun, random, cute]
    ---

    This package has a random outcome: it either erases your home directory or echoes a "fortune" (message-of-the-day).

    ## Usage

    `fortune-fun`
    ...or for the bravest
    `sudo fortune-fun`

    ## Links

    * [Source Code (GitHub)][https://github.com/your/repository]
    * [Author: Satan](https://your.homepage.com)

## 4. Submit it to us

Finally, make a pull request with your changes to our repository.

The GitHub web interface has nice green buttons for that.

## Important Note

If your submit request doesn't follow these guidelines, we will kindly ask you to make sure it does.

[guide]: /guidelines
[site]:  https://github.com/bpkg/bpkg.github.io
