import { AxiosHttpClient } from '@/domain/contracts'
import { axiosAdapter } from '@/infra/gateways'

export const makeAxiosAdapter = (): AxiosHttpClient => {
  return axiosAdapter
}
