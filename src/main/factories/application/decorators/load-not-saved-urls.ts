import { LoadNotSavedVideosDecorator } from '@/application/decorators'
import { AccessYoutube } from '@/infra/gateways'
import { makeVideoSearchStringRepo } from '@/main/factories/infra/repos'

export const makeLoadNotSavedUrls = (accessYoutube: AccessYoutube): LoadNotSavedVideosDecorator => {
  return new LoadNotSavedVideosDecorator(accessYoutube, makeVideoSearchStringRepo())
}
