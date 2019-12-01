import VisualizerType from './type';
import BaseVisualizer from "./base";
export default class SolidVisualizer extends BaseVisualizer {
    readonly type = VisualizerType.Solid;
    private barWidth;
    private barHeight;
    private colors;
    private gradientStops;
    private gradient;
    private margin;
    constructor(options: any);
    draw(spectrum: number[]): void;
}
