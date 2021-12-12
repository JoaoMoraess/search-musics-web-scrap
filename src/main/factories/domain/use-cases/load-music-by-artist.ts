import { LoadMusicsByArtists } from '@/domain/use-cases'
import { makeLoadMusicByArtist } from '@/main/factories/application/methods'

export const makeLoadMusicByArtists = (): LoadMusicsByArtists => {
  return new LoadMusicsByArtists(makeLoadMusicByArtist())
}
