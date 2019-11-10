console.log('init');

const canvas = document.querySelector('#canvas');
const canvasContext = canvas.getContext('2d');
const barWidth = 10;
canvas.width = barWidth * 64;
canvas.height = 255;

function render(spectrum) {
  canvas.width = barWidth * spectrum.length;
  canvasContext.fillStyle = 0x323232;
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < spectrum.length; i++) {
    canvasContext.fillRect(barWidth * i, canvas.height - spectrum[i], barWidth, canvas.height);
  }
}

let sound = window.sound = new Howl({
  src: "./audio.mp3",
  audoplay: false
});
let first = true;

document.querySelector("#play").addEventListener('click', async (event) => {
  if (first) {
    const audioContext = Howler.ctx;
    const analyserNode = audioContext.createAnalyser(); // 音分析ノード
    analyserNode.fftSize = 128;

    // スペクトラムを保持するUint8Array
    // サイズはfftSizeの半分（＝frequencyBinCount）
    const spectrumArray = new Uint8Array(analyserNode.frequencyBinCount);

    sound.on('play', () => {
      // console.log(sound._sounds[0]._node.bufferSource);
      const audioSource = sound._sounds[0]._node.bufferSource;
      audioSource.connect(analyserNode);
      analyserNode.connect(audioContext.destination);
      console.log("audioSource", audioSource)

      setInterval((event) => {
        analyserNode.getByteFrequencyData(spectrumArray);
        render(spectrumArray);
      }, 1 / 60);
    });

  }
  first = false;
  sound.play();
});

document.querySelector("#stop").addEventListener('click', () => {
  sound.stop();
});

