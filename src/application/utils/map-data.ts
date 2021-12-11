import { MapData } from '@/application/contracts'

export const mapData: MapData = (data) => {
  return data.musics
    .map((item: { desc: string }) => item.desc)
    .map((item: string) => `${data.artist} - ${item} Acústico`)
}
