# pon-audio-spectrum
[English](./README.en.md)

Web Audio ([howler.js](https://howlerjs.com/)) 向けのオーディオスペクトラムビジュアライザーです。

デモ: [https://okayumoka.github.io/pon-audio-spectrum/](https://okayumoka.github.io/pon-audio-spectrum/)

## はじめかた

```html
<!DOCTYPE html>
<html lang="ja">
<head></head>
<body>
  <div id="container"></div>
  <button id="play">Play</button>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.1.2/howler.js"></script>
  <script src="pon-audio-spectrum.js"></script>
  <script>
    // Howler audio の生成
    const howl = new Howl({ src: "audio.mp3", autoplay: false });

    // PonAudioSpectrum を生成し、音声を設定
    const options = {}
    const pas = new PonAudioSpectrum(PonAudioSpectrum.VisualizerType.Solid, options);
    pas.setAudio(howl);

    // PonAudioSpectrum の canvas を DOM に追加し、描画ループを開始
    document.getElementById("container").appendChild(pas.canvas);
    window.setInterval(() => {
      pas.draw();
    }, 1 / 60);

    // ボタン押下で音声を再生する
    document.getElementById("play").addEventListener("click", () => {
      howl.play();
    })
  </script>
</body>
</html>
```

## ビジュアライザーの種類

### Solid

```javascript
new PonAudioSpectrum(PonAudioSpectrum.VisualizerType.Solid, {});
```

![Type solid](images/type-solid.png)

### Block

```javascript
new PonAudioSpectrum(PonAudioSpectrum.VisualizerType.Block, {});
```

![Type block](images/type-block.png)

## オプション

### Solidのオプション

| OPTION | TYPE | DEFAULT | DESCRIPTION |
|--------|------|---------|-------------|
| fftSize       | number | 128 | 高速フーリエ変換(FFT) サイズ。参照: [AnalyserNode.fftSize](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize) |
| barWidth      | number | 15 | バーの幅 |
| barHeight     | number | 400 | バーの高さ |
| margin        | number | 2 | バーの間のマージン |
| colors        | Array\<string\>| ["#1d2088", "#8edcff"] | バーの色。複数の色を指定した場合はグラデーションになります。 |
| gradientStops | Array\<number\> | null | グラデーションのときの Color step |

### Blockのオプション

| OPTION | TYPE | DEFAULT | DESCRIPTION |
|--------|------|---------|-------------|
| fftSize     | number | 128 | 高速フーリエ変換(FFT) サイズ。参照: [AnalyserNode.fftSize](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize) |
| blockWidth  | number | 15 | ブロックの幅 |
| blockHeight | number | 8  | ブロックの高さ |
| blockCount  | number | 40 | 1列分のブロックの数 |
| marginh     | number | 2  | 水平方向のブロック間マージン |
| marginv     | number | 2  | 垂直方向のブロック間マージン |
| colors      | Array\<string\> | ["#1d2088", "#0068b7", "#00a0e9", "#8edcff"] | ブロックの色 |
| colorSteps  | Array\<number\> | [10, 20, 30, 40] | ブロックの色の切り替え位置 |
