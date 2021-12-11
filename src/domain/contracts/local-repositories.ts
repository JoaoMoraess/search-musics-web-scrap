export interface LoadLocalRepository {
  load: () => Promise<string[]>
}

export interface SaveLocalRepository {
  save: (dataToSave: string[]) => Promise<void>
}
