const s04_waveformNodeGenerator = analyserWaveform("s04_eOsc");

function s04_eOsc(type) {
    const ac = new AudioContext();
    const osc = new OscillatorNode(ac);
    osc.type = type;
    osc.start();
    osc.stop(ac.currentTime + 0.5);
    osc.connect(ac.destination);
    const a = s04_waveformNodeGenerator(ac);
    osc.connect(a);
}

async function s04_eBuf(cents = 0) {
    const ac = new AudioContext();
    const source = ac.createBufferSource();
    source.buffer = await loadAudioFile("assets/misc_crow.flac", ac);
    source.detune.value = cents;
    source.connect(ac.destination);
    source.start();
}

// Pulled from https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor#examples
async function s04_eWork() {
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
}

// // Load audio into buffer
// async function loadAudioFile(src, ac) {r
//     try {
//         const resp = await fetch(src);
//         const buf = await resp.arrayBuffer();
//         return await ac.decodeAudioData(buf);
//     } catch (err) {
//         console.error(`Unable to fetch the audio file. Error: ${err.message}`);
//     }
// }

// let drawRef = null;

// // Create analyserNode for waveform
// function analyserWaveform(id, ac) {
//     // const ac = new AudioContext();
//     const analyser = ac.createAnalyser();
//     const bufferLength = analyser.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);
//     analyser.getByteTimeDomainData(dataArray);

//     const canvas = document.getElementById(id);
//     const canvasCtx = canvas.getContext("2d");

//     if (drawRef) {
//         cancelAnimationFrame(drawRef);
//     }

//     // draw an oscilloscope of the current audio source
//     function draw() {
//         drawRef = requestAnimationFrame(draw);

//         analyser.getByteTimeDomainData(dataArray);

//         canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

//         canvasCtx.lineWidth = 2;
//         canvasCtx.strokeStyle = "#a6e22e";

//         canvasCtx.beginPath();

//         const sliceWidth = (canvas.width * 1.0) / bufferLength;
//         let x = 0;

//         for (let i = 0; i < bufferLength; i++) {
//             const v = dataArray[i] / 128.0;
//             const y = (v * canvas.height) / 2;

//             if (i === 0) {
//             canvasCtx.moveTo(x, y);
//             } else {
//             canvasCtx.lineTo(x, y);
//             }

//             x += sliceWidth;
//         }

//         canvasCtx.lineTo(canvas.width, canvas.height / 2);
//         canvasCtx.stroke();
//     }

//     draw();

//     return analyser;
// }