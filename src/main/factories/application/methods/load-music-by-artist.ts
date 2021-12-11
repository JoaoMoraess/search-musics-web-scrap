import { LoadMusicByArtist } from '@/application/methods'
import { makeAxiosAdapter } from '@/main/factories/infra/gateways'
import { makeCreateSearchStrings, makeSimplifyVagalumeHttpResponse } from '@/main/factories/application/utils'

export const makeLoadMusicByArtist = (): LoadMusicByArtist => {
  return new LoadMusicByArtist(
    makeAxiosAdapter(),
    makeSimplifyVagalumeHttpResponse(),
    makeCreateSearchStrings()
  )
}
