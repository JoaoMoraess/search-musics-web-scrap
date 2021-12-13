export interface LoadNotSavedVideos {
  perform: (searchStrings: string[]) => Promise<void>
}
