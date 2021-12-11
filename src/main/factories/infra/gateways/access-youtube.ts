import { AccessYoutube } from '@/infra/gateways'
import { makeVideoNamesRepo, makeVideoSearchStringRepo, makeVideosUrlRepo } from '../repos'

export const makeAccessYoutube = (): AccessYoutube => {
  return new AccessYoutube(makeVideosUrlRepo(), makeVideoNamesRepo(), makeVideoSearchStringRepo())
}
