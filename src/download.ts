import * as path from 'path'
import * as os from 'os'
import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

export async function download(version: string): Promise<string> {
  try {
    const platform = mapPlatform(os.platform())
    const arch = mapArch(os.arch())
    const url = createUrl(version, platform, arch)

    core.debug(`Downloading ODM at ${url}`)
    const tarPath = await tc.downloadTool(url)
    core.debug(`Unpacking ODM at ${tarPath}`)
    const odmFolder = await tc.extractTar(tarPath)
    core.debug(`ODM unpacked to ${odmFolder}`)
    const odmPath = path.join(odmFolder, 'odm')

    return odmPath
  } catch (e) {
    core.setFailed(e as string | Error)
    throw e
  }
}

export function createUrl(
  version: string,
  platform: string,
  arch: string
): string {
  if (version === 'latest') {
    return `https://github.com/johanfylling/opa-dependency-manager/releases/latest/download/odm-${platform}_${arch}.tar.gz`
  }
  return `https://github.com/johanfylling/opa-dependency-manager/releases/download/${version}/odm-${platform}_${arch}.tar.gz`
}

function mapArch(arch: string): string {
  const mappings: {[s: string]: string} = {
    x64: 'amd64'
  }
  return mappings[arch] || arch
}

function mapPlatform(platform: string): string {
  const mappings: {[s: string]: string} = {
    win32: 'windows'
  }
  return mappings[platform] || platform
}
