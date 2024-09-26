# Web audio API Basics

Paradigms

@note - API Structure
    - Take nodes, connect them together
        - Plugging discrete pieces of audio equipment into each other
    - Schedule start and stop times for nodes, value at time for AudioParams

---

```js
const ac = new AudioContext();
// default 440hz sine wave
const osc = new OscillatorNode(ac);
osc.start();
osc.stop(ac.currentTime + 0.5);
osc.connect(ac.destination);
```

@note - Remember the A440 example I showed earlier? This is the code that generated it
- Conceptually pretty simple: plugging oscillator into main output (destination)

---

## Directed Graph

<div class="mermaid">
  <pre>
    %%{init: {'theme': 'dark', 'themeVariables': { 'darkMode': true }}}%%
    flowchart LR
      osc([OscillatorNode]) --> ac[AudioContext.destination]
  </pre>
</div>

@note - visualization of that previous code
- Further: Actual Audio Processing takes place in the background, hidden (for the most part) from end developer
    - AudioWorklets - Special Web Worker that can render audio to a buffer directly

---

## Audio Params

Types: 
- a-rate - Current parameter value for each sample frame
- k-rate - same initial audio parameter for the whole block processed (128 sample frames)

```js
...
const osc = new OscillatorNode(ac);
osc.frequency.setValueAtTime(880, ac.currentTime + 0.25);
osc.start();
...
```

```js
osc.frequency.value = 880;
```

@note - Exactly what it says on the tin
- allows changing a value with respect to time
  - This is why it's not just a value on the node class
- can also just change the value directly
  - once a value at a given time is set, this is ignored though

---

```js
...
const osc = new OscillatorNode(ac);
osc.frequency.setValueAtTime(880, ac.currentTime + 0.25);
osc.start();
...
```

<button onclick="s03_e01()">Play</button>

@note - beginning of change to new frequency starts at time specified for previous event
  - previous event was sound being started

---

```js
...
osc.frequency.linearRampToValueAtTime(
  880, ac.currentTime + 0.25
);
...
```

<button onclick="s03_e02()">Play</button>

---

AudioNodes can also be connected to AudioParams

```js
const ac = new AudioContext();
const osc = new OscillatorNode(ac);
const lfo = new OscillatorNode(ac);
const gain = ac.createGain();
lfo.frequency.value = 4;
osc.connect(gain);
gain.connect(ac.destination);
lfo.connect(gain.gain);
osc.start();
lfo.start();
osc.stop(ac.currentTime + 1);
```

<button onclick="s03_e03()">Play</button>

@note - allows for continuously changing a parameter value 
- can't go the other way around

---

## Scheduling

__AudioScheduledSourceNode__ interface - OscillatorNode, ConstantSourceNode, AudioBufferSourceNode
- start(_time_), stop(_time_)
  
__AudioParam__ methods

@note - Last important part of API paradigm
- AudioScheduledSourceNodes allow setting start and stop times for when the node starts and stops playing sound
- AudioParams have 7 methods for setting values at a given time as well as interpolation between the current and target values
