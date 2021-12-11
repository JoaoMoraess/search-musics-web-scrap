
export interface LoadMusic {
  load: (params: LoadMusic.Input) => Promise<LoadMusic.Output>
}

export namespace LoadMusic {
  export type Input = {artistNameSlug: string, ammountOfSongs: number}
  export type Output = string[]
}
