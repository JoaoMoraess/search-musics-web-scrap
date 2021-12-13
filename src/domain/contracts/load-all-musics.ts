import { AmmountOfSongsPerArtist } from '.'

export interface LoaAndSavedAllMusics {
  loadAndSaveAllMusics: (ammountOfSongs: AmmountOfSongsPerArtist) => Promise<void>
}
