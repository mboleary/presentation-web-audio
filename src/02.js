
function s02_a440 () {
    const ac = new AudioContext();
    const osc = new OscillatorNode(ac); // default 440hz sine wave
    osc.start();
    osc.stop(ac.currentTime + 0.5);
    osc.connect(ac.destination);
}
