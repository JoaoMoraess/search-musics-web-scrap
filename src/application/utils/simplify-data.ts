import { SimplifyData } from '@/application/contracts'

export const simplifyVagalumeHttpResponse: SimplifyData = (rawData) => {
  return {
    artist: rawData.artist.desc,
    topMusics: rawData.artist.toplyrics.item,
    musics: rawData.artist.lyrics.item
  }
}
