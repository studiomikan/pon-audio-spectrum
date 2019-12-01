/// <reference types="howler" />
export default class PonAudioAnalyser {
    private howl;
    private fftSize;
    private ready;
    private analyserNode;
    private audioSource;
    private spectrumArray;
    private spectrum;
    get isReady(): boolean;
    get length(): number;
    constructor(howl: Howl, fftSize?: number);
    destroy(): void;
    getSpectrumArray(): number[];
}
