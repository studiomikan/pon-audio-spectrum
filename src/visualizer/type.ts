enum PonAudioVisualizerType {
  Solid = 0,
  Block
}
if (typeof window !== 'undefined') {
  (window as any).PonAudioVisualizerType = PonAudioVisualizerType;
}
export default PonAudioVisualizerType;
