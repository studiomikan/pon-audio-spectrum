/// <reference types="howler" />
import VisualizerType from './visualizer/type';
export default class PonAudioSpectrum {
    static VisualizerType: typeof VisualizerType;
    private analyser;
    private visualizerType;
    private visualizer;
    get canvas(): HTMLCanvasElement | null;
    constructor(type: VisualizerType, options: any);
    destroy(): void;
    setAudio(howl: Howl): void;
    get isReady(): boolean;
    draw(): void;
}
