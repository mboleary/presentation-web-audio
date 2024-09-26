// Load audio into buffer
async function loadAudioFile(src, ac) {
    try {
        const resp = await fetch(src);
        const buf = await resp.arrayBuffer();
        return await ac.decodeAudioData(buf);
    } catch (err) {
        console.error(`Unable to fetch the audio file. Error: ${err.message}`);
    }
}

const defaultStrokeStyle = {
    lineWidth: 2,
    strokeStyle: "#a6e22e",
    frequencyData: false
}

// Create analyserNode for waveform
function analyserWaveform(id, opt = defaultStrokeStyle) {
    let drawRef = null;
    return (ac) => {
        // const ac = new AudioContext();
        const analyser = ac.createAnalyser();
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        const canvas = document.getElementById(id);
        const canvasCtx = canvas.getContext("2d");

        if (drawRef) {
            cancelAnimationFrame(drawRef);
        }

        // draw an oscilloscope of the current audio source
        function draw() {
            drawRef = requestAnimationFrame(draw);

            if (opt.frequencyData) {
                analyser.getByteFrequencyData(dataArray);
            } else {
                analyser.getByteTimeDomainData(dataArray);
            }

            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

            canvasCtx.lineWidth = opt.strokeStyle || 2;
            canvasCtx.strokeStyle = opt.strokeStyle || "#fff";

            canvasCtx.beginPath();

            const sliceWidth = (canvas.width * 1.0) / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) {
                canvasCtx.moveTo(x, y);
                } else {
                canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        }

        draw();

        return analyser;
    }
}

// Load AudioBuffer from base64 string
function b64toBuffer(str) {
    const binStr = window.atob(str);
    const len = binStr.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binStr.charCodeAt(i);
    }
    return bytes.buffer;
}