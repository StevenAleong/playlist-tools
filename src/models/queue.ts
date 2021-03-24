import { Job } from './job'

export interface Queue {
    isProcessing: boolean,
    processing?: Job,
    queued: Job[],
    paused: boolean,
    cancel: boolean,
    progress: number
}