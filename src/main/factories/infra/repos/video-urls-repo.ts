import { VideosLocalRepo } from '@/infra/repos'

export const makeVideosUrlRepo = (): VideosLocalRepo => {
  return new VideosLocalRepo('src/records/videourls.txt')
}
