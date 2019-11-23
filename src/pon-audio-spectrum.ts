import { Howl } from 'howler';
import PonAudioAnalyser from './pon-audio-analyser';
import {
  IPonAudioVisualiser,
  PonAudioVisualiserType,
  PonAudioVisualiser
} from './pon-audio-spectrum-canvas';

export default class PonAudioSpectrum {
  private analyser: PonAudioAnalyser | null = null;
  private visualiserType: PonAudioVisualiserType;
  private visualiser: IPonAudioVisualiser | null = null;

  public get canvas(): HTMLCanvasElement | null {
    return this.visualiser != null ? this.visualiser.canvas : null;
  }

  constructor(type: PonAudioVisualiserType, options: any) {
    this.visualiserType = type;
    this.visualiser = PonAudioVisualiser.create(type, options);
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
      this.visualiser != null;
  }

  public draw(): void {
    if (this.analyser != null && this.visualiser != null && this.analyser.isReady) {
      this.visualiser.draw(this.analyser.getSpectrumArray());
    }
  }
}

if (typeof window !== 'undefined') {
  (window as any).PonAudioSpectrum = PonAudioSpectrum;
}
