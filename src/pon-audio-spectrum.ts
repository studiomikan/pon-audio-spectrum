import VisualizerType from './visualizer/type'
import { IVisualizer } from './visualizer/base';
import PonAudioAnalyser from './pon-audio-analyser';
import PonAudioVisualizer from './pon-audio-visualizer';

export default class PonAudioSpectrum {
  public static VisualizerType = VisualizerType;

  private analyser: PonAudioAnalyser | null = null;
  private fftSize: number = 128;
  private visualizerType: VisualizerType;
  private visualizer: IVisualizer | null = null;

  public get canvas(): HTMLCanvasElement | null {
    return this.visualizer != null ? this.visualizer.canvas : null;
  }

  constructor(type: VisualizerType, options: any) {
    this.visualizerType = type;
    this.visualizer = PonAudioVisualizer.create(type, options);
    if (options.fftSize != null && !isNaN(+options.fftSize)) {
      this.fftSize = +options.fftSize;
    }
  }

  public destroy(): void {
    if (this.analyser != null) {
      this.analyser.destroy();
    }
  }

  public setAudio(howl: Howl): void {
    this.analyser = new PonAudioAnalyser(howl, this.fftSize);
  }

  public get isReady(): boolean {
    return this.analyser != null &&
      this.analyser.isReady &&
      this.visualizer != null;
  }

  public draw(): void {
    if (this.analyser != null && this.visualizer != null && this.analyser.isReady) {
      this.visualizer.draw(this.analyser.getSpectrumArray());
    }
  }
}

if (typeof window !== 'undefined') {
  (window as any).PonAudioSpectrum = PonAudioSpectrum;
}
