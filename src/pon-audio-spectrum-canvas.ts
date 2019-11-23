export enum PonAudioVisualiserType {
  Solid = 0,
}
if (typeof window !== 'undefined') {
  (window as any).PonAudioVisualiserType = PonAudioVisualiserType;
}

export interface IPonAudioVisualiser {
  readonly type: PonAudioVisualiserType;
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D | null;
  draw(spectrum: number[]): void;
}

export class SolidVisualizer implements IPonAudioVisualiser {
  public readonly type = PonAudioVisualiserType.Solid;
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D | null;
  private barWidth: number;
  private barHeight: number;
  private barColors: string[];
  private barGradientStops: number[] | null = null;
  private barGradient: CanvasGradient | null = null;
  private barMargin: number;

  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public get context(): CanvasRenderingContext2D | null {
    return this._context;
  }

  constructor(options: any) {
    this.barWidth = options.barWidth ? options.barWidth : 15;
    this.barHeight = options.barHeight ? options.barHeight : 400;
    this.barColors = options.barColors ? options.barColors : ["#00FF00", "#FF0000"];
    this.barMargin = options.barMargin ? options.barMargin : 2;
    this.barGradientStops = options.barGradientStops ? options.barGradientStops : null;
    this._canvas = document.createElement("canvas");
    this._context = this.canvas.getContext("2d");
    this._canvas.height = this.barHeight;
    if (this._context != null) {
      const barGradient = this._context.createLinearGradient(this.barWidth, this.barHeight, 0, 0);
      if (this.barGradientStops == null) {
        const barGradientStops: number[] = this.barGradientStops = [];
        this.barColors.forEach((color: string, index: number) => {
          let stop = 0;
          if (index > 0) {
            stop = index / (this.barColors.length - 1);
          }
          barGradientStops[index] = stop;
        });
      }
      this.barColors.forEach((color: string, index: number) => {
        barGradient.addColorStop(this.barGradientStops![index], color); // eslint-disable-line @typescript-eslint/no-non-null-assertion
      });
      this.barGradient = barGradient;
      console.log(this.barGradient)
    }
  }

  draw(spectrum: number[]): void {
    if (this._context == null) {
      return;
    }
    const canvas = this._canvas;
    const context = this._context;
    const barWidth = this.barWidth;
    const barMargin = this.barMargin;
    canvas.width = (barWidth + barMargin) * spectrum.length - barMargin;
    context.fillStyle = this.barGradient != null ? this.barGradient : this.barColors[0];
    context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    for (let i = 0; i < spectrum.length; i++) {
      const barHeight = canvas.height * spectrum[i];
      context.fillRect((barWidth + barMargin) * i, canvas.height - barHeight, barWidth, canvas.height);
    }
  }
}

export class PonAudioVisualiser {
  public static create(type: PonAudioVisualiserType, options: any): IPonAudioVisualiser {
    switch (type) {
      case PonAudioVisualiserType.Solid:
        return new SolidVisualizer(options);
    }
    throw new Error(`Unknown PonAudioVisualiserType. (${type})`);
  }
}
