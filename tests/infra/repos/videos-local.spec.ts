import { VideosLocalRepo } from '@/infra/repos'
import { writeFile } from 'fs/promises'

describe('VideosLocalRepo', () => {
  let sut: VideosLocalRepo
  let fakeVideoUrlsPath: string

  beforeAll(() => {
    fakeVideoUrlsPath = 'tests/fake-records/videourls.txt'
  })

  beforeEach(async () => {
    await writeFile(fakeVideoUrlsPath, 'any_fake_url\nother_fake_url')
    sut = new VideosLocalRepo(fakeVideoUrlsPath)
  })

  describe('load', () => {
    it('should return the correct values', async () => {
      const urls = await sut.load()

      expect(urls).toEqual(['any_fake_url', 'other_fake_url'])
    })
    it('should return the empty array if file not exists', async () => {
      sut = new VideosLocalRepo('tests/fake-records/fake_path.txt')
      const urls = await sut.load()

      expect(urls).toEqual([])
    })
    it('should return the empty array if file is empty', async () => {
      await writeFile(fakeVideoUrlsPath, '')
      const urls = await sut.load()

      expect(urls).toEqual([])
    })
  })
  describe('save', () => {
    it('should save file and subescribe correctly', async () => {
      const oldUrls = await sut.load()
      await sut.save(['any_url_saved', 'other_url_saved'])

      const urls = await sut.load()

      expect(oldUrls).toEqual(['any_fake_url', 'other_fake_url'])
      expect(urls).toEqual(['any_url_saved', 'other_url_saved'])
    })
  })
})
