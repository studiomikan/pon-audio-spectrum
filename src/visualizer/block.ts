import VisualizerType from './type';
import BaseVisualizer from "./base";

export default class BlockVisualizer extends BaseVisualizer {
  public readonly type = VisualizerType.Block;
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
      if (this.remnantStartPoints[i] == null) {
        this.remnantStartPoints[i] = 0;
        this.remnantCurrentPoints[i] = 0;
        this.remnantTicks[i] = now;
      }
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
