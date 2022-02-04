#!/usr/bin/env node

import mmarkdown from './src/mmarkdown.js';
import yargs from 'yargs';

const argv = yargs
  .pkgConf('mmarkdown')
  .default('src', './ReadmeSrc/Readme.md')
  .default('out', './Readme.md')
  .default('backup', false)
  .default('backupPath', './ReadmeSrc/backup/')
  .default('scripts', null).argv

const app = async options => {
  try {
    await mmarkdown(options)
    console.log('Success!')
  } catch (err) {
    throw 'could not really make it, caaause: ' + err
  }
}

app(argv)
