import { VideosLocalRepo } from '@/infra/repos'

export const makeVideoSearchStringRepo = (): VideosLocalRepo => {
  return new VideosLocalRepo('src/records/videosearchstrings.txt')
}
