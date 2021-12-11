import { CreateSearchStrings } from '@/application/contracts'
import { setupCreateSearchStrings } from '@/application/utils'
import { makeMapData } from '.'

export const makeCreateSearchStrings = (): CreateSearchStrings => {
  return setupCreateSearchStrings(makeMapData())
}
