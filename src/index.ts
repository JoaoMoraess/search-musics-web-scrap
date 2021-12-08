import axios from "axios"

type numberOfMusics = number
type ArtistUrl = { [nameSlug: string]: numberOfMusics }

const artistsVagalumeUrl: ArtistUrl = {
  ['rio-negro-e-solimoes']: 30,
  ['paula-fernandes']: 20,
  ['milionario-e-jose-rico']: 30,
  ['xiru-missioneiro']: 30,
  ['marilia-mendonca']: 20,
  ['chitaozinho-e-xororo']: 30,
}

type artistData = { artist: string, topMusics: any[], musics: any[] }

const getSimplyficData = (obj: any): artistData => {
  return {
    artist: obj.data.artist.desc,
    topMusics: obj.data.artist.toplyrics.item,
    musics: obj.data.artist.lyrics.item
  }
}

const createSearchStrings = (data: artistData, numberOfMusics: number): string[] => {

  const topMusics = data.topMusics
    .map((item: { desc: any }) => item.desc)
    .map((item: any) => `${data.artist} - ${item}`).slice(0, numberOfMusics)
  

  if(topMusics.length >= numberOfMusics) {
    return topMusics
  } else {
    const musics = data.musics
      .map((item: { desc: any }) => item.desc)
      .map((item: any) => `${data.artist} - ${item}`)
      .filter((item) => !topMusics.includes(item))
      .slice(0, numberOfMusics - topMusics.length)

    return [...topMusics, ...musics]
  }
  
}

const getVagalumeApi = async (nameSlug: string, numberOfMusics: number): Promise<string[]> => {
  const result = await axios.get(`https://www.vagalume.com.br/${nameSlug}/index.js`)
  return createSearchStrings(getSimplyficData(result), numberOfMusics)
}



const getMusicsByArtist = async (vagalumeArtistUrl: ArtistUrl): Promise<string[]> => {
  const keys = Object.keys(artistsVagalumeUrl)
  const promises: Promise<string[]>[] = keys.map(async (key) => await getVagalumeApi(key, artistsVagalumeUrl[key]))
  const result = await Promise.all(promises)
  return result.flat()
}


getMusicsByArtist(artistsVagalumeUrl)
  .then((searchStrings: string[]) => {
    getYoutubeVideoIdWithoutApi(searchStrings)
      .then(result => console.log(result))
}).catch(error => console.log(error))



const getYoutubeVideoIdWithoutApi = async (searchStrings: string[]): Promise<string[]> => {
  return 
}

const getYoutubeVideoIdWithApi = async (searchStrings: string[]): Promise<string[]> => {
  const videosIds = searchStrings.map(async (title) => {
    const httpResponse = await axios.get('https://www.googleapis.com/youtube/v3/search',{
      params: {
        key: 'AIzaSyDzSqBEJIWBPGWgAk7RwYE6qZrhBZTAUFc',
        q: title,
        maxResults: 1,
        type: 'video'
      }
    })
    return httpResponse.data.items[0].id.videoId
  })
  return Promise.all(videosIds)
}
