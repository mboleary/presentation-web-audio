let ac = null;
let audioPlayback = null;

const s05_waveformNodeGenerator = analyserWaveform("s05_eFil", Object.assign({}, defaultStrokeStyle, {strokeStyle: "#42affa", frequencyData: true}));

// nodes
const nodes = {
    convolverNode: null,
    biquadFilterNode: null,
    delayNode: null,
    dynamicsCompressorNode: null,
};

async function s05_init() {
    ac = new AudioContext();
    audioPlayback = initLoopBuffer(ac, await loadAudioFile("assets/s725.ogg", ac));
    audioPlayback.start();

    // Make nodes
    await initConvolver(ac);
    nodes.biquadFilterNode = ac.createBiquadFilter();
    nodes.delayNode = ac.createDelay();
    nodes.dynamicsCompressorNode = ac.createDynamicsCompressor();

    // connect to output
    for (const key of Object.keys(nodes)) {
        nodes[key]?.connect(ac.destination);
    }

    initInputControls();
    initSelectControls();

    audioPlayback.connect(ac.destination);
    const a = s05_waveformNodeGenerator(ac);
    nodes.biquadFilterNode.connect(a);
}

function s05_stop() {
    audioPlayback.stop();
}

function initInputControls() {
    const els = document.querySelectorAll('input[data-slide="05"]');
    console.log(els);

    for (const el of els) {
        const data = el.dataset;
        console.log(data);

        const node = nodes[data.node];

        console.log("node:", node, data.param);

        if (node && node[data.param]) {
            // Connect this node's parameters
            const param = node[data.param]
            console.log(`Found param ${data.param}`, param);

            if (!el.hasAttribute('min')) {
                el.setAttribute('min', Math.ceil(param.minValue));
            }
            if (!el.hasAttribute('max')) {
                el.setAttribute('max', Math.floor(param.maxValue));
            }
            el.setAttribute('value', Math.floor(param.value));

            el.addEventListener('input', (e) => {
                param.value = e.target.value;
            });
        }
    }
}

function initSelectControls() {
    const els = document.querySelectorAll('select[data-slide="05"]');
    console.log(els);

    for (const el of els) {
        const data = el.dataset;
        console.log(data);

        const node = nodes[data.node];

        console.log("node:", node, data.prop);

        if (node && node[data.prop]) {
            // Connect this node's parameters
            const prop = data.prop;
            console.log(`Found prop ${prop}`);

            el.setAttribute('value', prop);

            el.addEventListener('change', (e) => {
                console.log(`update prop ${prop} ${e.target.value}`, node);
                node[prop] = e.target.value;
            });
        }
    }
}

function initLoopBuffer(ac, buf) {
    const source = ac.createBufferSource();
    source.buffer = buf;
    source.loop = true;
    return source;
}

async function initConvolver(ac) {
    const arrBuf = b64toBuffer(impulseResponse); // `impulseResponse` Defined in another file
    const audioData = await ac.decodeAudioData(arrBuf);
    nodes.convolverNode = ac.createConvolver();
    nodes.convolverNode.buffer = audioData;
}

function resetNodeConnections() {
    try {
        audioPlayback.disconnect(ac.destination);
    } catch {}
    // connect to output
    for (const key of Object.keys(nodes)) {
        try {
            audioPlayback.disconnect(nodes[key]);
        } catch {}
    }
}

function useNode(name) {
    if (name === 'none') {
        resetNodeConnections();
        audioPlayback.connect(ac.destination);
        return;
    }
    if (!nodes[name]) {
        throw new Error("Invalid node name");
    }

    resetNodeConnections();

    audioPlayback.connect(nodes[name]);
}

function s05_handleInput(nodeName, paramName) {

}