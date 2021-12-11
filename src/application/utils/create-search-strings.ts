import { SetupCreateSearchStrings } from '@/application/contracts'

export const setupCreateSearchStrings: SetupCreateSearchStrings = (mapFunction) =>
  (data, ammountOfSongs): string[] => {
    const topMusics = mapFunction({
      musics: data.topMusics,
      artist: data.artist
    }).slice(0, ammountOfSongs)

    if (topMusics.length >= ammountOfSongs) {
      return topMusics
    } else {
      const musics = mapFunction({
        musics: data.musics,
        artist: data.artist
      }).filter((item) => !topMusics.includes(item))
        .slice(0, ammountOfSongs - topMusics.length)

      return [...topMusics, ...musics]
    }
  }
