#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Katie Lefevre'
SITENAME = u'What are you doing here'
TAGLINE = u'It seems weird that you\'re here'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'America/Los_Angeles'

DEFAULT_LANG = u'en'

DEFAULT_DATE = 'fs'
# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

SOCIAL = (('github', 'http://github.com/ktel1218'),
          ('linkedin', 'https://www.linkedin.com/in/katielefevre/'),)

SHARE = (('twitter', 'http://twitter.com/share', '?text=', '&amp;url='),
         ('facebook', 'http://facebook.com/sharer.php', '?t=', '&amp;u='))

# Blogroll
# LINKS = (('Pelican', 'http://getpelican.com/'),
#          ('Python.org', 'http://python.org/'),
#          ('Jinja2', 'http://jinja.pocoo.org/'),
#          ('You can modify those links in your config file', '#'),)


# DEFAULT_PAGINATION = 10
PLUGINS = []


# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

#static paths will be copied without parsing their contents
STATIC_PATHS = ['images', 'games',]
PAGE_EXCLUDES = ['images', 'games']
ARTICLE_EXCLUDES = ['images', 'games']
DEFAULT_PAGINATION = False


# path-specific metadata
# EXTRA_PATH_METADATA = {
#     'games/game.html': {'path': 'game.html'},
#     }

THEME = "../pelican-themes/martin-pelican"
