import { LoadMusicByArtist } from '@/application/methods'
import { LoadMusicsByArtists } from '@/domain/use-cases/load-musics-by-artists'
import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadMusicsByArtists', () => {
  let sut: LoadMusicsByArtists
  let loadMusicsByartistSpy: MockProxy<LoadMusicByArtist>

  beforeAll(() => {
    loadMusicsByartistSpy = mock<LoadMusicByArtist>()
    loadMusicsByartistSpy.load.mockResolvedValue(['any_music_name', 'other_music_name'])
  })

  beforeEach(() => {
    sut = new LoadMusicsByArtists(loadMusicsByartistSpy)
  })
  it('should call loadMusicsByartist with correct values', async () => {
    await sut.loadAll({ 'any_artist_name': 2 })

    expect(loadMusicsByartistSpy.load).toHaveBeenCalledWith({ artistNameSlug: 'any_artist_name', ammountOfSongs: 2 })
  })
  it('should return the correct value', async () => {
    const musics = await sut.loadAll({ 'any_artist_name': 2 })

    expect(musics).toEqual(['any_music_name', 'other_music_name'])
  })
})
