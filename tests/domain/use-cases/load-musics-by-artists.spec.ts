import { LoadNotSavedVideos } from '@/application/contracts'
import { LoadMusicByArtist } from '@/application/methods'
import { LoadAndSaveMusicsByArtists } from '@/domain/use-cases/load-musics-by-artists'
import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadAndSaveMusicsByArtists', () => {
  let sut: LoadAndSaveMusicsByArtists
  let loadAndSaveMusicsByArtistspy: MockProxy<LoadMusicByArtist>
  let loadNotSavedUrlsSpy: MockProxy<LoadNotSavedVideos>

  beforeAll(() => {
    loadAndSaveMusicsByArtistspy = mock<LoadMusicByArtist>()
    loadAndSaveMusicsByArtistspy.load.mockResolvedValue(['any_music_name', 'other_music_name'])

    loadNotSavedUrlsSpy = mock<LoadNotSavedVideos>()
    loadNotSavedUrlsSpy.perform.mockImplementation()
  })

  beforeEach(() => {
    sut = new LoadAndSaveMusicsByArtists(loadAndSaveMusicsByArtistspy, loadNotSavedUrlsSpy)
  })
  it('should call loadMusicsByartist with correct values', async () => {
    await sut.loadAndSaveAllMusics({ 'any_artist_name': 2 })

    expect(loadAndSaveMusicsByArtistspy.load).toHaveBeenCalledWith({ artistNameSlug: 'any_artist_name', ammountOfSongs: 2 })
  })
  it('should call loadNotSavedUrls with correct values', async () => {
    await sut.loadAndSaveAllMusics({ 'any_artist_name': 2 })

    expect(loadNotSavedUrlsSpy.perform).toHaveBeenCalledWith(['any_music_name', 'other_music_name'])
  })
})
