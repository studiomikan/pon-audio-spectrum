import VisualizerType from './type';
import BaseVisualizer from "./base";
export default class BlockVisualizer extends BaseVisualizer {
    readonly type = VisualizerType.Block;
    blockWidth: number;
    blockHeight: number;
    blockCount: number;
    marginv: number;
    marginh: number;
    colors: string[];
    colorSteps: number[];
    stepedColors: string[];
    remnantStartPoints: number[];
    remnantCurrentPoints: number[];
    remnantTicks: number[];
    constructor(options: any);
    draw(spectrum: number[]): void;
    private drawBlock;
    private updateRemnantPoints;
}
