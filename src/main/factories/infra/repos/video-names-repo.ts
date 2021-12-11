import { VideosLocalRepo } from '@/infra/repos'

export const makeVideoNamesRepo = (): VideosLocalRepo => {
  return new VideosLocalRepo('src/records/videonames.txt')
}
