import { CreateSearchStrings, LoadMusic, SimplifyData } from '@/application/contracts'
import { AxiosHttpClient } from '@/domain/contracts'

export class LoadMusicByArtist implements LoadMusic {
  constructor (
    private readonly axiosAdapter: AxiosHttpClient,
    private readonly simplifyVagalumeHttpResponse: SimplifyData,
    private readonly createSearchStrings: CreateSearchStrings
  ) {}

  async load ({ ammountOfSongs, artistNameSlug }: LoadMusic.Input): Promise<LoadMusic.Output> {
    const { data } = await this.axiosAdapter({ type: 'get', url: `https://www.vagalume.com.br/${artistNameSlug}/index.js` })
    const artistData = this.simplifyVagalumeHttpResponse(data)
    const searchStrings = this.createSearchStrings(artistData, ammountOfSongs)
    return searchStrings
  }
}
