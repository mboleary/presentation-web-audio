# Web audio API Basics

Operating Theory and Principles

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
