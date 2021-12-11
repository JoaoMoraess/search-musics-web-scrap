import { LoadLocalRepository } from '@/domain/contracts'
import { AccessYoutube } from '@/infra/gateways'

interface LoadNotSavedVideos {
  perform: (searchStrings: string[]) => Promise<any>
}

export class LoadNotSavedVideosDecorator implements LoadNotSavedVideos {
  constructor (
    private readonly decoratee: AccessYoutube,
    private readonly loadVideoSearchStringsRepo: LoadLocalRepository
  ) {}

  async perform (searchStrings: string[]): Promise<any> {
    const savedSearchStrings = await this.loadVideoSearchStringsRepo.load()
    const notSavedSearchStrings = searchStrings.filter(string => !savedSearchStrings.includes(string))
    return notSavedSearchStrings.length === 0 ? console.log('TODAS AS MUSICAS ESTAO SALVAS') : await this.decoratee.perform(notSavedSearchStrings)
  }
}
