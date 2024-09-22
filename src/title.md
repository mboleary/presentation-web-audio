# A Practical Guide to the Web Audio API

This is the title slide

@note - something about web audio

---

## Slide 2?

---

## Slide 3

---

```js
async function midiInputTest() {
  const ac = new AudioContext();
  const node = new MusicEngineOscillatorNode(
    ac, 'sawtooth', 'midi synth', nanoid(), ['midi', 'synth']
  );
  const apDest = new AudioPort('dest', PortDirection.IN);
  apDest.registerAudioNode(ac.destination);
  node.audioOut.connect(apDest);

  const midiAccess = await MidiAccess.start(ac);
  const devicePort = midiAccess.midiInputNode
    .getMidiPorts()
    .filter(port => port.name.indexOf('Port-0') === -1)[0];
  if (devicePort) {
    devicePort.connect(node.midiIn);
  }
}
```

---

```js
const node = new OscillatorNode(this.context);
const freq = noteToFrequencyEqualTemperment(note);
node.frequency.value = freq;
node.addEventListener('ended', (e) => {
  const t = e.target as OscillatorNode;
  // remove node from active nodes
  const activeNoteIdx = this.activeNotes.indexOf(t);
  if (activeNoteIdx >= 0) {
    this.activeNotes.splice(activeNoteIdx, 1);
  }
  this.detune.unregisterAudioParam(t.detune);
  t.disconnect();
});
node.connect(this.gainNode);
node.start(time);
```

---

<div class="mermaid">
  <pre>
    %%{init: {'theme': 'dark', 'themeVariables': { 'darkMode': true }}}%%
    flowchart TD
      A[Start] --> B{Is it?};
      B -- Yes --> C[OK];
      C --> D[Rethink];
      D --> B;
      B -- No ----> E[End];
  </pre>
</div>


separated
