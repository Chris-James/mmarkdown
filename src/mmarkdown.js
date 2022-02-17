import path from 'path-extra';
import fs from 'fs-extra';
import * as files from './fileUtilities.js';
import * as extract from './extract.js';

const backup = async argv => {
  try {
    const backupFileName = path.fileNameWithPostfix(
      argv.out,
      '-' + Math.round(new Date().getTime() / 1000)
    )
    await fs.copy(argv.out, argv.backupPath + backupFileName)
  } catch (err) {
    // throw 'backup: ' + err
    // if ENOENT we should return ok.
    return
  }
}

const save = async argv => {
  try {
    const data = await files.readFile(argv.src)
    const code = extract.parseBlocks(data)

    const str = await extract.injectBlocks(code.text, code.blocks, argv.scripts)
    await files.writeFile(argv.out, str)
  } catch (err) {
    throw 'save: ' + err
  }
}

const mmarkdown = async argv => {
  try {
    if (argv.backup) {
      await backup(argv)
    }
    await save(argv)
  } catch (err) {
    throw 'mmarkdown: ' + err
  }
}

export default mmarkdown;
