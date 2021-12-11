import { LoadMusicByArtist } from '@/application/methods'
import { AmmountOfSongsPerArtist, LoadAllMusics } from '@/domain/contracts'

export class LoadMusicsByArtists implements LoadAllMusics {
  constructor (
    private readonly loadMusicByArtist: LoadMusicByArtist
  ) {}

  async loadAll (ammountOfSongs: AmmountOfSongsPerArtist): Promise<string[]> {
    const keys = Object.keys(ammountOfSongs)
    const promises: Array<Promise<string[]>> = keys
      .map(async (key) => await this.loadMusicByArtist.load({ artistNameSlug: key, ammountOfSongs: ammountOfSongs[key] }))
    const result = await Promise.all(promises)
    return result.flat()
  }
}
