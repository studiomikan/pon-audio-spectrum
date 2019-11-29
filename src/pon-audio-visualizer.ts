import VisualizerType from './visualizer/type';
import { IVisualizer } from './visualizer/base';
import SolidVisualizer from './visualizer/solid';
import BlockVisualizer from './visualizer/block';

export default class PonAudioVisualizer {
  private static visualizers = {};

  public static create(type: VisualizerType, options: any): IVisualizer {
    switch (type) {
      case VisualizerType.Solid: return new SolidVisualizer(options);
      case VisualizerType.Block: return new BlockVisualizer(options);
    }
    throw new Error(`Unknown PonAudioVisualizerType. (${type})`);
  }
}
