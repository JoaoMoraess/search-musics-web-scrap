import { LoadMusicsByArtists } from '@/domain/use-cases'
import { makeLoadMusicByArtist } from '../../application/methods'

export const makeLoadMusicByArtists = (): LoadMusicsByArtists => {
  return new LoadMusicsByArtists(makeLoadMusicByArtist())
}
