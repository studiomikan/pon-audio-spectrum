export enum PonAudioVisualizerType {
  Solid = 0,
  Block
}
if (typeof window !== 'undefined') {
  (window as any).PonAudioVisualizerType = PonAudioVisualizerType;
}

export interface IPonAudioVisualizer {
  readonly type: PonAudioVisualizerType;
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D | null;
  draw(spectrum: number[]): void;
}

export class PonBaseAudioVisualizer implements IPonAudioVisualizer {
  public readonly type: PonAudioVisualizerType = PonAudioVisualizerType.Solid;
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private options: any;

  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

  constructor(options: any) {
    this.options = options;
    this._canvas = document.createElement("canvas");
    const context = this.canvas.getContext("2d");
    if (context == null) {
      throw Error("Cannot get context 2d");
    }
    this._context = context;
  }

  draw(spectrum: number[]): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw Error("extends me!");
  }

  applyOptions(options: any, defaultValues: any): void {
    const me: any = this as any;
    Object.keys(defaultValues).forEach((valueName) => {
      if (options[valueName] != null) {
        me[valueName] = options[valueName];
      } else {
        me[valueName] = defaultValues[valueName];
      }
    });
  }
}

export class SolidVisualizer extends PonBaseAudioVisualizer {
  public readonly type = PonAudioVisualizerType.Solid;
  private barWidth!: number;
  private barHeight!: number;
  private colors!: string[];
  private gradientStops!: number[] | null;
  private gradient: CanvasGradient;
  private margin!: number;

  constructor(options: any) {
    super(options);
    this.applyOptions(options, {
      barWidth: 15,
      barHeight: 400,
      colors: ["#00FF00", "#FF0000"],
      margin: 2,
      gradientStops: null
    });
    this.canvas.height = this.barHeight;
    if (this.gradientStops == null) {
      const gradientStops: number[] = this.gradientStops = [];
      this.colors.forEach((color: string, index: number) => {
        let stop = 0;
        if (index > 0) {
          stop = index / (this.colors.length - 1);
        }
        gradientStops[index] = stop;
      });
    }
    this.gradient = this.context.createLinearGradient(this.barWidth, this.barHeight, 0, 0);
    this.colors.forEach((color: string, index: number) => {
      this.gradient.addColorStop(this.gradientStops![index], color); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    });
  }

  draw(spectrum: number[]): void {
    const canvas = this.canvas;
    const context = this.context;
    const barWidth = this.barWidth;
    const margin = this.margin;
    canvas.width = (barWidth + margin) * spectrum.length - margin;
    context.fillStyle = this.gradient;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < spectrum.length; i++) {
      const barHeight = canvas.height * spectrum[i];
      context.fillRect((barWidth + margin) * i, canvas.height - barHeight, barWidth, canvas.height);
    }
  }
}

export class BlockVisualizer extends PonBaseAudioVisualizer {
  public readonly type = PonAudioVisualizerType.Block;
  public blockWidth!: number;
  public blockHeight!: number;
  public blockCount!: number;
  public marginv!: number;
  public marginh!: number;
  public colors!: string[];
  public colorSteps!: number[];

  public stepedColors: string[] = [];
  public remnantStartPoints: number[] = [];
  public remnantCurrentPoints: number[] = [];
  public remnantTicks: number[] = [];

  constructor(options: any) {
    super(options);
    this.applyOptions(options, {
      blockWidth: 15,
      blockHeight: 8,
      blockCount: 40,
      marginh: 2,
      marginv: 2,
      colors: ["#00FF00", "#FFFF00", "#FF0000"],
      colorSteps: [20, 30, 40]
    });
    this.canvas.height = (this.blockHeight + this.marginv) * this.blockCount - this.marginv;

    let colorPos = 0;
    for (let i = 0; i < this.blockCount; i++) {
      if (this.colorSteps[colorPos] <= i) {
        colorPos++;
        if (colorPos >= this.colors.length) {
          colorPos = this.colors.length - 1;
        }
      }
      this.stepedColors[i] = this.colors[colorPos];
    }
    (window as any).tmp = {
      s: this.remnantStartPoints,
      c: this.remnantCurrentPoints,
      t: this.remnantTicks
    };
  }

  draw(spectrum: number[]): void {
    const now = Date.now();
    this.canvas.width = (this.blockWidth + this.marginh) * spectrum.length - this.marginh;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < spectrum.length; i++) {
      const height = this.canvas.height * spectrum[i];
      const blockPoint = Math.floor(height / (this.blockHeight + this.marginh));
      for (let j = 0; j < blockPoint; j++) {
        this.drawBlock(i, j);
      }
      // 残滓
      // if (blockPoint > 0 && this.remnantPoints[i] < blockPoint) {
      if (this.remnantStartPoints[i] == null) {
        this.remnantStartPoints[i] = 0;
        this.remnantCurrentPoints[i] = 0;
        this.remnantTicks[i] = now;
      }
      // if (blockPoint > 0 && this.remnantCurrentPoints[i] < blockPoint) {
      if (this.remnantCurrentPoints[i] <= blockPoint) {
        this.remnantStartPoints[i] = blockPoint;
        this.remnantCurrentPoints[i] = blockPoint;
        this.remnantTicks[i] = now;
      }
      if (this.remnantCurrentPoints[i] >= 0) {
        this.drawBlock(i, this.remnantCurrentPoints[i]);
      }
    }
    this.updateRemnantPoints(now);
  }

  private drawBlock(xp: number, yp: number): void {
    const x = (this.blockWidth + this.marginh) * xp;
    const y = this.canvas.height - this.blockHeight - (this.blockHeight + this.marginv) * yp;
    this.context.fillStyle = this.stepedColors[yp];
    this.context.fillRect(x, y, this.blockWidth, this.blockHeight);
  }

  private updateRemnantPoints(now: number): void {
    for (let i = 0; i < this.remnantStartPoints.length; i++) {
      const start = this.remnantStartPoints[i];
      const t = this.remnantTicks[i];
      if (start <= 0 || t <= 0) { continue; }

      const e = now - t - 128;
      if (e <= 0) {
        this.remnantCurrentPoints[i] = start;
        continue;
      }
      const p = start - Math.floor(e / 64);
      this.remnantCurrentPoints[i] = p;
      if (p < 0) {
        this.remnantStartPoints[i] = 0;
        this.remnantCurrentPoints[i] = 0;
        this.remnantTicks[i] = 0;
      }
    }
  }
}

// export class BlockVisualizer extends PonBaseAudioVisualizer {
//   public readonly type = PonAudioVisualizerType.Block;
//   public blockWidth!: number;
//   public blockHeight!: number;
//   public blockCount!: number;
//   public marginv!: number;
//   public marginh!: number;
//   public color!: string;

//   constructor(options: any) {
//     super(options);
//     this.applyOptions(options, {
//       blockWidth: 15,
//       blockHeight: 8,
//       blockCount: 40,
//       marginh: 2,
//       marginv: 2,
//       color: "#00FF00"
//     });
//     this.canvas.height = (this.blockHeight + this.marginv) * this.blockCount - this.marginv;
//   }

//   draw(spectrum: number[]): void {
//     this.canvas.width = (this.blockWidth + this.marginh) * spectrum.length - this.marginh;
//     this.context.fillStyle = this.color;
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     for (let i = 0; i < spectrum.length; i++) {
//       const height = this.canvas.height * spectrum[i];
//       const blockCount = Math.floor(height / (this.blockHeight + this.marginh));
//       for (let j = 0; j < blockCount; j++) {
//         const x = (this.blockWidth + this.marginh) * i;
//         const y = this.canvas.height - this.blockHeight - (this.blockHeight + this.marginv) * j;
//         this.context.fillRect(x, y, this.blockWidth, this.blockHeight);
//       }
//     }
//   }
// }


export class PonAudioVisualizer {
  public static create(type: PonAudioVisualizerType, options: any): IPonAudioVisualizer {
    switch (type) {
      case PonAudioVisualizerType.Solid: return new SolidVisualizer(options);
      case PonAudioVisualizerType.Block: return new BlockVisualizer(options);
    }
    throw new Error(`Unknown PonAudioVisualizerType. (${type})`);
  }
}
