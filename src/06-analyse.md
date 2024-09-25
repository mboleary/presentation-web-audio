# Analysis

@note - TODO

---

## Fourier Transform

---

## AudioAnalyser Node

We saw this earlier

```js
const analyser = ac.createAnalyser();
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);
...
// Put current waveform into buffer
analyser.getByteTimeDomainData(dataArray);
...
```

---

@note - I just threw a lot of information at you