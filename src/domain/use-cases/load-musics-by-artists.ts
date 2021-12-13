import { LoadNotSavedVideos } from '@/application/contracts'
import { LoadMusicByArtist } from '@/application/methods'
import { AmmountOfSongsPerArtist, LoaAndSavedAllMusics } from '@/domain/contracts'

export class LoadAndSaveMusicsByArtists implements LoaAndSavedAllMusics {
  constructor (
    private readonly loadMusicByArtist: LoadMusicByArtist,
    private readonly loadNotSavedUrls: LoadNotSavedVideos
  ) {}

  async loadAndSaveAllMusics (ammountOfSongs: AmmountOfSongsPerArtist): Promise<void> {
    const keys = Object.keys(ammountOfSongs)
    const promises: Array<Promise<string[]>> = keys
      .map(async (key) => await this.loadMusicByArtist.load({
        artistNameSlug: key,
        ammountOfSongs: ammountOfSongs[key]
      }))
    const result = await Promise.all(promises)
    const musics = result.flat()

    await this.loadNotSavedUrls.perform(musics)
  }
}
