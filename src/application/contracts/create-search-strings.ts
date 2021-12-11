import { ArtistData, MapData } from '.'

export type CreateSearchStrings = (data: ArtistData, ammountOfSongs: number) => string[]
export type SetupCreateSearchStrings = (mapFunction: MapData) => CreateSearchStrings
