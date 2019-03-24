# Releaselog

[![npm version](https://img.shields.io/npm/v/@wpsh/releaselog.svg)](https://www.npmjs.com/package/@wpsh/releaselog)
[![Build Status](https://travis-ci.com/wpsh/releaselog.svg?branch=master)](https://travis-ci.com/wpsh/releaselog)
[![Coverage Status](https://coveralls.io/repos/github/wpsh/releaselog/badge.svg?branch=master)](https://coveralls.io/github/wpsh/releaselog?branch=master)

Automatically build project `changelog.txt` from [GitHub release notes](https://help.github.com/en/articles/creating-releases).


## Install

Install using [`npm`](https://www.npmjs.com) as a development dependency:

```bash
npm install --save-dev @wpsh/releaselog
```


## Usage

As a [Node module](https://nodejs.org/api/modules.html):

```js
const fs = require('fs');
const releaselog = require('@wpsh/releaselog').default;

releaselog('kasparsd/widget-context-wporg') 
  .then(changelog => {
    fs.writeFile('changelog.txt', changelog)
  })
  .catch(err => console.error(err));
```


## Credits

Created by [Kaspars Dambis](https://kaspars.net).
