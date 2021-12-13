import { LoadNotSavedVideos } from '@/application/contracts'
import { LoadNotSavedVideosDecorator } from '@/application/decorators'
import { AccessYoutube } from '@/infra/gateways'
import { makeVideoSearchStringRepo } from '@/main/factories/infra/repos'

export const makeAccessYoutubeWithNotSavedUrls = (accessYoutube: AccessYoutube): LoadNotSavedVideos => {
  return new LoadNotSavedVideosDecorator(accessYoutube, makeVideoSearchStringRepo())
}
