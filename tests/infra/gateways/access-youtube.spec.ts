import { LoadLocalRepository, SaveLocalRepository } from '@/domain/contracts'
import { AccessYoutube } from '@/infra/gateways'
import { MockProxy, mock } from 'jest-mock-extended'

jest.mock('puppeteer', () => ({
  launch: () => ({
    newPage: () => ({
      goto: () => null,
      type: () => null,
      click: () => null,
      waitForSelector: () => null,
      $eval: () => null
    }),
    close: () => null
  })
}) as any)

describe('AccessYoutube', () => {
  let sut: AccessYoutube
  let videosNamesLocalRepoSpy: MockProxy<SaveLocalRepository & LoadLocalRepository>
  let videosUrlsLocalRepoSpy: MockProxy<SaveLocalRepository & LoadLocalRepository>
  let videosSearchStringsLocalRepoSpy: MockProxy<SaveLocalRepository & LoadLocalRepository>

  beforeAll(() => {
    videosNamesLocalRepoSpy = mock<SaveLocalRepository & LoadLocalRepository>()
    videosNamesLocalRepoSpy.save.mockResolvedValue()
    videosNamesLocalRepoSpy.load.mockResolvedValue(['any_video_names'])
    videosUrlsLocalRepoSpy = mock<SaveLocalRepository & LoadLocalRepository>()
    videosUrlsLocalRepoSpy.load.mockResolvedValue(['any_video_url'])
    videosUrlsLocalRepoSpy.save.mockResolvedValue()
    videosSearchStringsLocalRepoSpy = mock<SaveLocalRepository & LoadLocalRepository>()
    videosSearchStringsLocalRepoSpy.load.mockResolvedValue(['any_video_searchstring'])
    videosSearchStringsLocalRepoSpy.save.mockResolvedValue()
  })

  beforeEach(() => {
    sut = new AccessYoutube(videosUrlsLocalRepoSpy, videosNamesLocalRepoSpy, videosSearchStringsLocalRepoSpy)
  })
  it('should call VideosLocalRepo.load', async () => {
    await sut.perform(['any_music_search_string', 'other_music_search_string'])

    expect(videosUrlsLocalRepoSpy.save).toHaveBeenCalledTimes(2)
    expect(videosNamesLocalRepoSpy.save).toHaveBeenCalledTimes(2)
    expect(videosSearchStringsLocalRepoSpy.save).toHaveBeenCalledTimes(2)
  })
})
