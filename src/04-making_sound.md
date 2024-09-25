# Making Sound

How do we generate sound?

---

```html
<audio src="...">   <video src="...">
```

```js
const ac = new AudioContext();
const audioEl = document.querySelector("audio");
const source = ac.createMediaElementSource(audioEl);
// We can connect this to other nodes now!
const gain = ac.createGain();
gain.connect(ac.destination);
```

@note - We can use the HTML Media Elements (Audio and Video) and then convert it into an audio source

---

## Oscillator Node

```js
const ac = new AudioContext();
// default 440hz sine wave
const osc = new OscillatorNode(ac);
osc.type = "...";
osc.start();
osc.stop(ac.currentTime + 0.5);
osc.connect(ac.destination);
```

4 types of sound waves:

<button onclick="s04_eOsc('sine')">sine</button>
<button onclick="s04_eOsc('square')">square</button>
<button onclick="s04_eOsc('sawtooth')">sawtooth</button>
<button onclick="s04_eOsc('triangle')">triangle</button>

<canvas id="s04_eOsc" width="800" height="200"></canvas>

---

OscillatorNodes can also use a custom waveform type.

```js
const real = new Float32Array(2);
const imag = new Float32Array(2);
const ac = new AudioContext();
const osc = ac.createOscillator();

real[0] = 0;
imag[0] = 0;
real[1] = 1;
imag[1] = 0;

const wave = ac.createPeriodicWave(real, imag, { disableNormalization: true });

osc.setPeriodicWave(wave);

osc.connect(ac.destination);

osc.start();
osc.stop(2);
```
(From MDN)

@note - There's also custom waveforms, which uses an array of floats to perform an inverse Fourier Transform to generate the sound
- example produces a sine wave

---

## Audio Buffer Source Node

Sound sampling

---

```js
const ac = new AudioContext();
const source = ac.createBufferSource();
source.buffer = await loadAudioFile(
    "assets/misc_crow.flac", ac
);
source.connect(ac.destination);
source.start();
```

Load audio into buffer

```js
async function loadAudioFile(src, ac) {
    try {
        const resp = await fetch(src);
        return await ac.decodeAudioData(
            await resp.arrayBuffer()
        );
    } catch (err) {
        console.error(
            `Unable to fetch the audio file. Error: ${
                err.message
            }`
        );
    }
}
```

<button onclick="s04_eBuf()">Play</button>
<button onclick="s04_eBuf(-500)">Play at -500 cents (5 semitones below)</button>

@note - Here we're loading a sound file into a buffer and playing it
- We can change the pitch by using the k-rate

---

## Audio Worklet

A Worker (like a separate thread) that can generate audio directly into a buffer

```js
const ac = new AudioContext();
await ac.audioWorklet.addModule("src/04-worklet.js");
const whiteNoiseNode = new AudioWorkletNode(
    ac,
    "white-noise-processor",
);
const gain = ac.createGain();
whiteNoiseNode.connect(gain);
gain.connect(ac.destination);
gain.gain.setValueAtTime(0, ac.currentTime + 0.5);
```

@note - I added that GainNode so that I could mute the white noise
    - it runs continuously

---

Worker code

```js
class WhiteNoiseProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = Math.random() * 2 - 1;
      }
    });
    return true;
  }
}
registerProcessor(
    "white-noise-processor", WhiteNoiseProcessor
);
```

<button onclick="s04_eWork()">Play</button>