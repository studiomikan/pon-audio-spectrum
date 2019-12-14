export default class PonAudioAnalyser {
  private howl: Howl;
  private fftSize: number;
  private ready: boolean = false;
  private analyserNode: AnalyserNode | null = null;
  private audioSource: AudioBufferSourceNode | null = null;
  private spectrumArray: Uint8Array;
  private spectrum: number[] = [];

  public get isReady(): boolean {
    return this.ready;
  }

  public get length(): number{
    const min = Math.floor(this.spectrumArray.length * 0.1)
    const max = Math.floor(this.spectrumArray.length * 0.8)
    return max - min;
  }

  constructor(howl: Howl, fftSize = 128) {
    this.howl = howl;
    this.fftSize = fftSize;
    this.spectrumArray = new Uint8Array(fftSize / 2);

    const analyserNode = Howler.ctx.createAnalyser(); // 音分析ノード
    this.analyserNode = analyserNode;
    this.analyserNode.fftSize = this.fftSize;
    this.howl.on('play', () => {
      const audioSource: AudioBufferSourceNode = (this.howl as any)._sounds[0]._node.bufferSource;
      this.audioSource = audioSource;
      // console.log(this.audioSource.connect(analyserNode));
      this.ready = true;
    });
  }

  public destroy(): void {
    if (this.audioSource != null && this.analyserNode != null) {
      try {
        this.audioSource.disconnect(this.analyserNode);
      } catch (e) {
        console.error(e);
      }
    }
    this.audioSource = null;
    this.analyserNode = null;
    this.ready = false;
  }

  public getSpectrumArray(): number[] {
    const spectrumArray = this.spectrumArray;
    const spectrum = this.spectrum;
    let sp = 0;
    if (this.ready && this.analyserNode != null) {
      this.analyserNode.getByteFrequencyData(spectrumArray);
      const min = Math.floor(spectrumArray.length * 0.1)
      const max = Math.floor(spectrumArray.length * 0.8)
      for (let i = min; i < max; i++) {
        spectrum[sp++] = spectrumArray[i] / 256;
      }
    }
    return this.spectrum;
  }
}
