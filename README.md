# bpkg.github.io (bpkg.sh)

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

This environment is not necessary to use if you'd rather run everything directly on your host system.  This environment is provided however, to facilitate all the required components for building and development of `bpkg` site.

A `docker-composer.yml` file exists in the root directory of the project to specify the Docker services

* `jekyll` &ndash; Perform Jekyll and Rake processes
  > **NOTE:** _A custom `Dockerfile` exists to generate the image for this service, in the `dev/jekyll` directory_
* `lessc` &ndash; Implements LESS preprocessing
* `sitediff` &ndash; Host SiteDiff for performing site comparison

There are associated `bpkg` commands to interact with the Docker environments, accompanying Docker commands will be listed like the other `bpkg` commands.

## Dependencies

This website was made with the [Jekyll][jekyll] engine, so it depends on a few
Ruby Gems. To install them, run the following command:

```bash
$ gem install jekyll
```

It might take a while to finish, but once it does you're ready to go.

## Edit Site Pages

To **make changes** to the page or **run it locally**, clone this GitHub
repository and make sure you have _installed the dependencies_ above.

Then, it's a matter of editing pages and running `rake` tasks.  Here's a rundown
of possible commands (thanks to [this great quickstart on Jekyll][tuto]).

### Preview Site

```bash
$ rake preview
```

> **BPKG:** `preview`<br />
> **BPKG:** `docker-preview`

Builds the entire site to a local folder `_site` and launches a webserver to
preview it.

To see the full site, point your browser to [`localhost:4000`][preview-url].

If you make any changes on any files, it will regenerate the website
automatically.

### Create Post

```bash
$ rake post title="Hello, World!"
```

> **BPKG:** `post title="Hello, World!"`<br />
> **BPKG:** `docker-post title="Hello, World!"`

Creates a new post. It will create a file `_posts/YYYY-MM-DD-title.md`, where
the date is the current, by default.

No further changes are required, the post will get automatically inserted on the
site.

### Create Page

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

## Update Style Sheets

This project uses [LESS (Leaner Style Sheets)][less] files to generate the CSS for this site.  When modifying the site style sheets under the `/assets` directory, update the LESS files (ie: `*.less`).  To update the CSS file after making changes to any of the LESS files, run the following command (from the root of the project):

```bash
$ lessc ./assets/themes/the-program/css/style.less ./assets/themes/the-program/css/style.css
```

> **BPKG:** `lessc`<br />
> **BPKG:** `docker-lessc`

## View Site Changes

When working on the site, sometimes it's helpful to see changes between the production copy and the output of local changes.  A report of changes can be generated with the [SiteDiff][sitediff] tool, to simplify this process a Docker service has been included with a few `bpkg` commands.  This is a multi-step process (each step has an associated 'bpkg' command), but a single command can be used to run all the steps.  Before performing these steps the local version needs to be in [preview mode](#preview-site).

### SiteDiff - Crawl Sites

The SiteDiff utility will crawl the production and the preview versions of the site prior to performing the comparison:

> **BPKG:** `site-crawl`

### SiteDiff - Diff Crawled Sites

After crawling the versions of the sites, SiteDiff will compare the preview against the production version and generate a change report:

> **BPKG:** `site-diff`

### SiteDiff - Serve Report

The generated report can be served for viewing by SiteDiff:

> **BPKG:** `site-serve`

To see the report, point your browser to [`localhost:13080`][report-url].

### SiteDiff

The preceding command performs the following steps (which can be run individually):

> **BPKG:** `sitediff`

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

[home]:        https://bpkg.sh/
[hub]:         https://github.com/bpkg/bpkg
[org]:         https://github.com/bpkg/
[jekyll]:      https://jekyllrb.com/
[tuto]:        http://jekyllbootstrap.com/usage/jekyll-quick-start.html
[preview-url]: http://localhost:4000/
[less]:        https://lesscss.org/
[sitediff]:    http://sitediff.io/
[report-url]:  http://localhost:13080/
[posts]:       https://jekyllrb.com/docs/posts/
[intro]:       http://jekyllbootstrap.com/lessons/jekyll-introduction.html
[boots]:       http://jekyllbootstrap.com/
[theme]:       https://github.com/jekyllbootstrap/theme-the-program/
[saito]:       https://studiomohawk.com/
