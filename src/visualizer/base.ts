import VisualizerType from './type';

export interface IVisualizer {
  readonly type: VisualizerType;
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D | null;
  draw(spectrum: number[]): void;
}

export default class BaseVisualizer implements IVisualizer {
  public readonly type: VisualizerType = VisualizerType.Solid;
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
