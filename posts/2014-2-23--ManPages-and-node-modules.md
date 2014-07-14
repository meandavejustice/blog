<!-- --- -->
<!-- layout: post -->
<!-- tags: [portland, open source, web development, coding, hack, node, node modules, man, man pages, unix, marked man, npm] -->
<!-- --- -->

## Man Pages and Node Modules

I've been thinking a lot lately about documentation. The node
community is somewhat known for having poor documentation and issues
with discoverablity. While the python community has fantastic tools
like [Read the Docs](https://readthedocs.org/), we are many times left
with a single readme.

### Keeping everything small

Our "One readme per package" practice fits in well with the small
module philosophy. But It can be painful digging around in
`node-modules` directories looking for that readme. Users generally
will just open up the repo and view the nicely formatted markdown in
the github ui. But what about offline development? This was a pain
point for us mentors at the most recent NodeSchool.io. Specifically
digging around for Async docs when students were continually being
booted off of the WiFi.

### man {package-name}

Being that our community loves to follow the
[unix philosophy](http://blog.izs.me/post/48281998870/unix-philosophy-and-node-js)
why not take advantage of tools developers are already familiar with?
Lets generate man pages for all of our node modules.

### man page generation

Generating man pages out of existing readme's is extremely straight
forward. There's already a module for that.

Go ahead and install [marked-man](https://github.com/kapouer/marked-man)

`npm install -g marked-man`

Now we just need to point marked-man to the markdown file we want to
generate our manpage from.

`marked-man README.md > doc/package-name.1`

Try it out by running

`man path/to/manpage`

You should get something like this.

![](http://i.imgur.com/99ZZX9M.png)

Now all we need to do is let npm know about our manpage. We'll edit
our package.JSON.

![](http://i.imgur.com/n1exAjl.png)

If the module is installed globally with npm it will copy the manpages
from the path specified in the `man` property to
`{prefix}/share/man`.

It's as simple as that. If you'd like to dig in a little bit deeper on
this subject take a look at these resources.

* [Unix and Node: Manual Pages](http://dailyjs.com/2012/02/16/unix-node-community/)
* [Formatting Man Pages](http://www.fnal.gov/docs/products/ups/ReferenceManual/html/manpages.html)
* [Marked-man](https://github.com/kapouer/marked-man)
* [man npm docs](https://www.npmjs.org/doc/files/package.json.html#man)

If your never without an internet connection or just hate man pages
you can always run the

[npm docs ...](https://www.npmjs.org/doc/cli/npm-docs.html) command:

`npm docs {package-name}`

Go forth and generate more accessible documentation!

## UPDATE

The npm feature written about in this blog post is currently not
working. You can track the issue
[here](https://github.com/npm/npm/issues/4768).
