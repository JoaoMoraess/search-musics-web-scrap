export type AxiosHttpClient = (params: AxiosParams) => Promise<{data: any, status: number}>

export type AxiosParams = {
  type: 'get'
  url: string
  params?: any
}
