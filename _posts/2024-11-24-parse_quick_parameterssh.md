---
layout: post
title: "parse_quick_parameters.sh"
description: ""
category: 
tags: []
---
{% include JB/setup %}
layout: post
title: "parse-quick-parameters"
description: "Given a docstring, configures named parameters for a bash function"
category: bash
tags: [bash]
---

Provide a documentation string to get named function parameters. Fork of msknapp's. Similar to docopt


## Installation

Just copy the file or use package managers.

### Use bkpg

Get [bpkg](https://www.bpkg.sh/).

To get the source version:
```bash
bpkg install matthewdeanmartin/parse_quick_parameters.sh
```

To get the hosted version:
```bash
bpkg install parse_quick_parameters
```

### Use git-remote-get

This is a fancy way of just downloading git files.
```
pip install git-remote-get
git-remote-get ./ --owner matthewdeanmartin --repo "parse_quick_parameters.sh" deps
```

## Usage

```bash
#!/usr/bin/env bash
source deps/parse_quick_parameters/parse_quick_parameters.sh

function do_something_quick {
    parse_quick_parameters "my_file=-f|--file,bool:run=-r|--run,name=-n|--name" "$@" || return 0
    echo "my file is: $my_file"
    echo "my name is: $name"
    echo "run is: $run"
}
```

```terminal
>> source parse_quick_parameters.sh
>> do_something_quick --name name --run --file file
my file is: file
my name is: name
run is: true
>> do_something_quick "file" "name" --run
my file is: file
my name is: name
run is: true
```



## Notes

Shellcheck doesn't understand the pattern and will raise [SC2154](https://github.com/koalaman/shellcheck/wiki/SC2154)

## Alternatives

- [getopts](https://en.wikipedia.org/wiki/Getopts) Builtin bash command
- [docopts](https://github.com/docopt/docopts) Shell version of `docopts`
- [argparse-bash](https://github.com/nhoffman/argparse-bash) Use python's argparse in bash

## Contributing

Use `Makefile`. `bats` tests assume `bats` was installed with `npm`. 
```
make format lint test
```


## Credits

- [msknapp](https://github.com/msknapp/maintainable-bash/blob/master/1_init/3.1_parameters/shortcut.sh#L3)
