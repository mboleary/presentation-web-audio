## Effects

Nodes that can be used to alter sounds.

- BiquadFilterNode - a simple filter
- ConvolverNode - Reverb
- DelayNode - adds a delay
- DynamicsCompressorNode - compresses the audio to help prevent peaking (distortion)
- GainNode - volume
- WaveShaperNode - distortion
- IIRFilterNode - Infinite Impulse Response

<button onclick="s05_init()">Start</button>
<button onclick="s05_stop()">Stop Playback</button>

@note - These are all of the different nodes that can be used to alter sounds
- Demo with an audio loop

---

## Biquad Filter Node

<button onclick="useNode('biquadFilterNode')">Use Filter</button>

```js
const biquadFilterNode = ac.createBiquadFilter();
biquadFilterNode.type = "...";
```

<div>
    <label>frequency
        <input type="range" data-slide="05" data-node="biquadFilterNode" data-param="frequency" />
    </label>
    <label>Q
        <input type="range" data-slide="05" data-node="biquadFilterNode" data-param="Q" min="1" max="50" />
    </label>
    <label>gain
        <input type="range" data-slide="05" data-node="biquadFilterNode" data-param="gain" min="-40" max="40" />
    </label>
    <label>Type
        <select data-slide="05" data-node="biquadFilterNode" data-prop="type">
            <option value="lowpass">lowpass</option>r
            <option value="highpass">highpass</option>
            <option value="bandpass">bandpass</option>
            <option value="lowshelf">lowshelf</option>
            <option value="highshelf">highshelf</option>
            <option value="peaking">peaking</option>
            <option value="notch">notch</option>
            <option value="allpass">allpass</option>
        </select>
    </label>
</div>

<button onclick="s05_stop()">Stop Playback</button>

<canvas id="s05_eFil" width="800" height="200"></canvas>

@note - Filter types:
    - lowpass
    - highpass
    - bandpass - within a range
    - lowshelf - frequencies lower than freq get boost (attenuation), freq over unchanged
    - highshelf - frequencies higher than freq get boost (attenuation), freq under unchanged
    - peaking - freq inside range get attenuated, outside unchanged
    - notch - band-stop / band-rejection (freq outside range pass through)
    - allpass - all frequencies pass through, change phase relationship

---

## Convolver Node (Reverb)

<button onclick="useNode('convolverNode')">Use Reverb</button>

```js
... // `arrBuf` is raw byte data from impulse
const audioData = await ac.decodeAudioData(arrBuf);
nodes.convolverNode = ac.createConvolver();
nodes.convolverNode.buffer = audioData;
```

<button onclick="s05_stop()">Stop Playback</button>

@note - Reverb
- Impulse is a waveform that captures the acoustic characteristics of a location

---

## Delay Node

<button onclick="useNode('delayNode')">Use Delay</button>

```js
const delayNode = audioCtx.createDelay(5.0);
```

<label>Delay Time
    <input type="range" data-slide="05" data-node="delayNode" data-param="delayTime" />
</label>

<button onclick="s05_stop()">Stop Playback</button>

---

## Dynamics Compressor Node

<button onclick="useNode('dynamicsCompressorNode')">Use Compressor</button>

```js
const dynamicsCompressorNode = ac.createDynamicsCompressor();
```

<div>
    <label>threshold
        <input type="range" data-slide="05" data-node="dynamicsCompressorNode" data-param="threshold" />
    </label>
    <label>knee
        <input type="range" data-slide="05" data-node="dynamicsCompressorNode" data-param="knee" />
    </label>
    <label>ratio
        <input type="range" data-slide="05" data-node="dynamicsCompressorNode" data-param="ratio" />
    </label>
    <label>attack
        <input type="range" data-slide="05" data-node="dynamicsCompressorNode" data-param="attack" />
    </label>
    <label>release
        <input type="range" data-slide="05" data-node="dynamicsCompressorNode" data-param="release" />
    </label>
</div>

<button onclick="s05_stop()">Stop Playback</button>

---

## Gain Node

We've already seen this in a few places

<button onclick="s05_stop()">Stop Playback</button>