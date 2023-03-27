# bpkg.github.io

`bpkg` is a lightweight bash package manager.
This repository contains the source code of it's homepage.

## Links

* [`bpkg` homepage][home];
* [`bpkg` source code on GitHub][hub];
* [`bpkg` organization on GitHub][org];

## `bpkg` Commands

To assist in working with this project, A `bpkg.json` file has been included with commonly used project commands.  The provided commands can be executed using the following format:

```bash
$ bpkg run [COMMAND]
```

In the remainder of this document, if there is a accompanying `bpkg` _command_ it will be listed as follows:

> **BPKG:** `[COMMAND]`

## Docker Environment

This environment is not necessary to use if you'd rather run everything directly on your host system.  This environment is provided however, to facilitate all the required components for building and development of `bpkg` site.  There are associated `bpkg` commands to interact with the Docker environment.

## Dependencies

This website was made with the [Jekyll][jekyll] engine, so it depends on a few
Ruby Gems. To install them, run the following command.

```bash
$ gem install jekyll
```

It might take a while to finish, but once it does you're ready to go.

## How to edit

To **make changes** to the page or **run it locally**, clone this GitHub
repository and make sure you have _installed the dependencies_ above.

Then, it's a matter of editing pages and running `rake` tasks.  Here's a rundown
of possible commands (thanks to [this great quickstart on Jekyll][tuto]):

---

```bash
$ rake preview
```

> **BPKG:** `preview`<br />
> **BPKG:** `docker-preview`

Builds the entire site to a local folder `_site` and launches a webserver to
preview it.

To see the full site, point your browser to `localhost:4000`.

If you make any changes on any files, it will regenerate the website
automatically.

---

```bash
$ rake post title="Hello, World!"
```

> **BPKG:** `post title="Hello, World!"`<br />
> **BPKG:** `docker-post title="Hello, World!"`

Creates a new post. It will create a file `_posts/YYYY-MM-DD-title.md`, where
the date is the current, by default.

No further changes are required, the post will get automatically inserted on the
site.

---

```bash
$ rake page name="about"
```

> **BPKG:** `page name="about"`<br />
> **BPKG:** `docker-page name="about"`

Creates a new page. It will create the file `./about/index.html`.

```bash
$ rake page name="about.html"
```

> **BPKG:** `page name="about.html"`<br />
> **BPKG:** `docker-page name="about.html"`

Alternative way to create a new page, on this case it will be `./about.html`.

## Notes

* When producing content (writing pages/posts) keep in mind
  [this useful guide][posts]. It tells how to include images, display
  post excerpts and highlight code snippets.
* If you plan on further customizing the blog, it's highly recommended to
  read [this 10-minute introduction to Jekyll][intro].
* If you change settings on the file `_config.yml`, automatic regeneration won't
  work - you'll have to run the command `rake preview` again.

## Credits

This site uses [Jekyll Bootstrap][boots] with a heavily customized version of
[the_program][theme] theme, originally made by [Yuya Saito][saito].

[home]:    https://bpkg.sh/
[hub]:     https://github.com/bpkg/bpkg
[org]:     https://github.com/bpkg
[jekyll]:  http://jekyllrb.com/
[tuto]:    http://jekyllbootstrap.com/usage/jekyll-quick-start.html
[posts]:   http://jekyllrb.com/docs/posts/
[intro]:   http://jekyllbootstrap.com/lessons/jekyll-introduction.html
[boots]:   http://jekyllbootstrap.com/
[theme]:   https://github.com/jekyllbootstrap/theme-the-program
[saito]:   http://css.studiomohawk.com/
