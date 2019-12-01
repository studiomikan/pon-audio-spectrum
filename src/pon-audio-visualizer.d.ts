import VisualizerType from './visualizer/type';
import { IVisualizer } from './visualizer/base';
export default class PonAudioVisualizer {
    private static visualizers;
    static create(type: VisualizerType, options: any): IVisualizer;
}
