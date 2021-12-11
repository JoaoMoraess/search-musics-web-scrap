import { LoadLocalRepository, SaveLocalRepository } from '@/domain/contracts'
import { readFile, writeFile } from 'fs/promises'

export class VideosLocalRepo implements LoadLocalRepository, SaveLocalRepository {
  constructor (
    private readonly videoUrlsPath: string
  ) {}

  async load (): Promise<string[]> {
    try {
      const buffer = await readFile(this.videoUrlsPath)
      const urls = buffer.toString('utf-8')
      return urls === '' ? [] : urls.split('\n')
    } catch {
      return []
    }
  }

  async save (dataToSave: string[]): Promise<void> {
    await writeFile(this.videoUrlsPath, dataToSave.join('\n'))
  }
}
