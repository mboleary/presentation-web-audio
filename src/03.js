function s03_e01() {
    const ac = new AudioContext();
    const osc = new OscillatorNode(ac); // default 440hz sine wave
    osc.frequency.setValueAtTime(880, ac.currentTime + 0.25)
    osc.start();
    osc.stop(ac.currentTime + 0.5);
    osc.connect(ac.destination);
}

function s03_e02() {
    const ac = new AudioContext();
    const osc = new OscillatorNode(ac); // default 440hz sine wave
    osc.frequency.linearRampToValueAtTime(880, ac.currentTime + 0.25)
    osc.start();
    osc.stop(ac.currentTime + 0.5);
    osc.connect(ac.destination);
}

function s03_e03() {
    const ac = new AudioContext();
    const osc = new OscillatorNode(ac); // default 440hz sine wave
    const lfo = new OscillatorNode(ac);
    const gain = ac.createGain();
    lfo.frequency.value = 4;
    osc.connect(gain);
    gain.connect(ac.destination);
    lfo.connect(gain.gain);
    osc.start();
    lfo.start();
    osc.stop(ac.currentTime + 1);
}
