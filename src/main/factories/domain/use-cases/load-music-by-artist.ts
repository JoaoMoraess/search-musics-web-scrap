import { LoadAndSaveMusicsByArtists } from '@/domain/use-cases'
import { makeLoadMusicByArtist } from '@/main/factories/application/methods'
import { makeAccessYoutubeWithNotSavedUrls } from '@/main/factories/application/decorators/load-not-saved-urls'
import { makeAccessYoutube } from '@/main/factories/infra/gateways'

export const makeLoadAndSaveMusicsByArtists = (): LoadAndSaveMusicsByArtists => {
  return new LoadAndSaveMusicsByArtists(makeLoadMusicByArtist(), makeAccessYoutubeWithNotSavedUrls(makeAccessYoutube()))
}
