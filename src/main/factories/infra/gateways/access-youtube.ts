import { AccessYoutube } from '@/infra/gateways'
import { makeVideoNamesRepo, makeVideoSearchStringRepo, makeVideosUrlRepo } from '@/main/factories/infra/repos'

export const makeAccessYoutube = (): AccessYoutube => {
  return new AccessYoutube(makeVideosUrlRepo(), makeVideoNamesRepo(), makeVideoSearchStringRepo())
}
