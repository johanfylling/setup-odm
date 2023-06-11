import {createUrl, download} from '../src/download'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_VERSION'] = 'latest'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})

test('latest version URL', () => {
  let url = createUrl('latest', 'foo', 'bar')
  expect(url).toBe('https://github.com/johanfylling/opa-dependency-manager/releases/latest/download/odm-foo_bar.tar.gz')
})

test('v1.2.3 version URL', () => {
  let url = createUrl('v1.2.3', 'foo', 'bar')
  expect(url).toBe('https://github.com/johanfylling/opa-dependency-manager/releases/download/v1.2.3/odm-foo_bar.tar.gz')
})

test('download', async () => {
  const odmPath = await download('latest')
  console.log(odmPath)
})
