import { AxiosHttpClient } from '@/domain/contracts'
import axiosRequest from 'axios'

export const axiosAdapter: AxiosHttpClient = async ({ params, type, url }): Promise<any> => {
  const { data, status } = await axiosRequest({
    method: type,
    url,
    params
  })
  return { data, status }
}
