import { LoadMusicByArtist } from '@/application/methods'

describe('LoadMusicByArtist', () => {
  let sut: LoadMusicByArtist
  let axiosAdapterMock: jest.Mock
  let simplifyVagalumeHttpResponseMock: jest.Mock
  let createSearchStringsMock: jest.Mock

  beforeAll(() => {
    axiosAdapterMock = jest.fn().mockResolvedValue({ data: ['nihil', 'gateka'], status: 200 })
    simplifyVagalumeHttpResponseMock = jest.fn().mockReturnValue({
      artist: 'any_artist',
      topMusics: ['any_top_music_name', 'other_top_music_name'],
      musics: ['any_music_name', 'other_music_name']
    })
    createSearchStringsMock = jest.fn().mockReturnValue(['any_artist any_music_name', 'other_artist other_music_name'])
  })

  beforeEach(() => {
    sut = new LoadMusicByArtist(axiosAdapterMock, simplifyVagalumeHttpResponseMock, createSearchStringsMock)
  })

  it('should call axiosAdapter with correct values', async () => {
    await sut.load({ ammountOfSongs: 2, artistNameSlug: 'ghostmane' })

    expect(axiosAdapterMock).toHaveBeenCalled()
    expect(axiosAdapterMock).toHaveBeenCalledTimes(1)
  })

  it('should return the correct musics', async () => {
    const musics = await sut.load({ ammountOfSongs: 2, artistNameSlug: 'ghostmane' })

    expect(musics).toEqual(['any_artist any_music_name', 'other_artist other_music_name'])
  })
  it('should call simplifyVagalumeHttpResponse with correct values', async () => {
    await sut.load({ ammountOfSongs: 2, artistNameSlug: 'ghostmane' })

    expect(simplifyVagalumeHttpResponseMock).toHaveBeenCalled()
    expect(simplifyVagalumeHttpResponseMock).toHaveBeenCalledTimes(1)
  })
  it('should call createSearchStrings with correct values', async () => {
    await sut.load({ ammountOfSongs: 2, artistNameSlug: 'ghostmane' })

    expect(createSearchStringsMock).toHaveBeenCalled()
    expect(createSearchStringsMock).toHaveBeenCalledTimes(1)
  })
})
