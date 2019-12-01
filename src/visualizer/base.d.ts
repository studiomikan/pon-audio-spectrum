import VisualizerType from './type';
export interface IVisualizer {
    readonly type: VisualizerType;
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D | null;
    draw(spectrum: number[]): void;
}
export default class BaseVisualizer implements IVisualizer {
    readonly type: VisualizerType;
    private _canvas;
    private _context;
    private options;
    get canvas(): HTMLCanvasElement;
    get context(): CanvasRenderingContext2D;
    constructor(options: any);
    draw(spectrum: number[]): void;
    applyOptions(options: any, defaultValues: any): void;
}
