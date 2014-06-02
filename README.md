# bpkg.github.io

`bpkg` is a lightweight bash package manager.
This repository contains the source code of it's homepage.

## Links:

* [`bpkg` homepage][home];
* [`bpkg` source code on GitHub][hub];
* [`bpkg` organization on GitHub][org];

## Dependencies

This website was made with the [Jekyll][jekyll] engine, so it depends on a few
Ruby Gems. To install them, run the following command.

    $ gem install jekyll

It might take a while to finish, but once it does you're ready to go.

## How to edit

To **make changes** to the page or **run it locally**, clone this GitHub
repository and make sure you have _installed the dependencies_ above.

Then, it's a matter of editing pages and running `rake` tasks.  Here's a rundown
of possible commands (thanks to [this great quickstart on Jekyll][tuto]):

---

    $ rake preview

Builds the entire site to a local folder `_site` and launches a webserver to
preview it.

To see the full site, point your browser to `localhost:40000`.

If you make any changes on any files, it will regenerate the website
automatically.

---

    $ rake post title="Hello, World!"

Creates a new post. It will create a file `_posts/YYYY-MM-DD-title.md`, where
the date is the current, by default.

No further changes are required, the post will get automatically inserted on the
site.

---

    $ rake page name="about"

Creates a new page. It will create the file `./about/index.html`.

    $ rake page name="about.html"

Alternative way to create a new page, on this case it will be `./about.html`.

## Notes

* When producing content (writing pages/posts) keep in mind
  [this useful guide][posts]. It tells how to include images, display
  post excerpts and highlight code snippets.
* If you plan on further customizing the blog, it's highly recommended to
  read [this 10-minute introduction to Jekyll][intro].

## Credits

This site uses [Jekyll Bootstrap][boots] with the great theme
[the_program][theme], from [Yuya Saito][saito].

[home]:    http://bpkg.io/
[hub]:     https://github.com/bpkg/bpkg
[org]:     https://github.com/bpkg
[jekyll]:  http://jekyllrb.com/
[tuto]:    http://jekyllbootstrap.com/usage/jekyll-quick-start.html
[intro]:   http://jekyllbootstrap.com/lessons/jekyll-introduction.html
[boots]:   http://jekyllbootstrap.com/
[theme]:   https://github.com/jekyllbootstrap/theme-the-program
[saito]:   http://css.studiomohawk.com/
[posts]:   http://jekyllrb.com/docs/posts/

