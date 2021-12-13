import { LoadNotSavedVideosDecorator } from '@/application/decorators'
import { LoadLocalRepository } from '@/domain/contracts'
import { AccessYoutube } from '@/infra/gateways'
import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadNotSavedVideosDecorator', () => {
  let sut: LoadNotSavedVideosDecorator
  let decorateeSpy: MockProxy<AccessYoutube>
  let loadVideoSearchStringsRepoSpy: MockProxy<LoadLocalRepository>

  beforeAll(() => {
    decorateeSpy = mock<AccessYoutube>()
    decorateeSpy.perform.mockResolvedValue()
    loadVideoSearchStringsRepoSpy = mock<LoadLocalRepository>()
    loadVideoSearchStringsRepoSpy.load.mockResolvedValue(['any_search_string', 'other_search_string'])
  })

  beforeEach(() => {
    sut = new LoadNotSavedVideosDecorator(decorateeSpy, loadVideoSearchStringsRepoSpy)
  })

  it('should call loadVideoSearchStringsRepo', async () => {
    await sut.perform(['any_search_string', 'other_search_string'])

    expect(loadVideoSearchStringsRepoSpy.load).toHaveBeenCalled()
  })
  it('should call decoratee with correct values', async () => {
    await sut.perform(['any_not_saved_string', 'any_search_string'])

    expect(decorateeSpy.perform).toHaveBeenCalledWith(['any_not_saved_string'])
  })
  it('should call decoratee with correct values if loadVideoSearchStringsRepoSpy return empty', async () => {
    loadVideoSearchStringsRepoSpy.load.mockResolvedValueOnce([])
    await sut.perform(['any_not_saved_string', 'other_not_saved_string'])

    expect(decorateeSpy.perform).toHaveBeenCalledWith(['any_not_saved_string', 'other_not_saved_string'])
  })
  it('should not call decoratee if all musics is saved', async () => {
    loadVideoSearchStringsRepoSpy.load.mockResolvedValueOnce(['any_saved_string', 'other_saved_string'])
    await sut.perform(['any_saved_string', 'other_saved_string'])

    expect(decorateeSpy.perform).not.toHaveBeenCalled()
  })
})
