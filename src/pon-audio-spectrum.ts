import { Howl } from 'howler';
import PonAudioAnalyser from './pon-audio-analyser';
import {
  IPonAudioVisualizer,
  PonAudioVisualizerType,
  PonAudioVisualizer
} from './pon-audio-spectrum-canvas';

export default class PonAudioSpectrum {
  private analyser: PonAudioAnalyser | null = null;
  private visualizerType: PonAudioVisualizerType;
  private visualizer: IPonAudioVisualizer | null = null;

  public get canvas(): HTMLCanvasElement | null {
    return this.visualizer != null ? this.visualizer.canvas : null;
  }

  constructor(type: PonAudioVisualizerType, options: any) {
    this.visualizerType = type;
    this.visualizer = PonAudioVisualizer.create(type, options);
  }

  public destroy(): void {
    if (this.analyser != null) {
      this.analyser.destroy();
    }
  }

  public setAudio(howl: Howl): void {
    this.analyser = new PonAudioAnalyser(howl);
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
