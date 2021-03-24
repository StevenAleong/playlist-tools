export interface Job {
    uniqueId: string,
    source: string,
    name: string,
    playlistId: string,
    jobType: string,
    totalTracks: number,
    currentProcessingIndex: number,
    dateAdded: Date,
    cancelProcessing: boolean
}