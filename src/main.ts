import * as fs from 'fs'
import * as core from '@actions/core'
import {download} from './download'

async function run(): Promise<void> {
  try {
    const version = core.getInput('version')
    core.info(`Setup ODM version ${version}`)
    const odmPath = await download(version)
    fs.chmodSync(odmPath, '755')
    core.addPath(odmPath)
  } catch (e) {
    core.setFailed(e as string | Error)
  }
}

run()
