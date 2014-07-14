<!-- --- -->
<!-- layout: post -->
<!-- tags: [portland, web development, ubuntu, python, trusty, ffmpeg, audio] -->
<!-- --- -->

## Installing FFMPEG on Ubuntu Trusty

Attempting to install [ffmpeg](http://ffmpeg.org/) onto a fresh install of Ubuntu 14.04 x32 (Trusty)
I got this Error:

``` bash
No candidate version found for ffmpeg
```

It just so happens that Jon Severinsson has a [ppa](https://launchpad.net/~jon-severinsson/+archive/ffmpeg).

All you have to do is add, update, and install.

``` bash
sudo add-apt-repository ppa:jon-severinsson/ffmpeg
sudo apt-get update
sudo apt-get install ffmpeg
```

Now go forth and build something rad with [pyDub](http://pydub.com/)!
