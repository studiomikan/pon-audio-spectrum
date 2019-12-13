import VisualizerType from './type';
import BaseVisualizer from "./base";

export default class SolidVisualizer extends BaseVisualizer {
  public readonly type = VisualizerType.Solid;
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
      colors: ["#1d2088", "#8edcff"],
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
