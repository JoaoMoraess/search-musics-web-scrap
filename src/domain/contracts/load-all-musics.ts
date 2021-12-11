import { AmmountOfSongsPerArtist } from '.'

export interface LoadAllMusics {
  loadAll: (ammountOfSongs: AmmountOfSongsPerArtist) => Promise<string[]>
}
