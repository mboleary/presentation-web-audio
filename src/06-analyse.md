# Analysis

@note - How can we analyse audio?

---

## Fourier Transform

![discrete fourier transform equation](assets/fourier.svg)

- Used to get frequencies out of a waveform

@note - this can also go the other way around with an inverse transform
- Luckily we don't have to do the math or implementation of that

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

@note - If you rememebr that custom waveform I talked about earlier with the OscillatorNode, that's implementing the inverse fourier transform to generate the waveform from the frequencies
- (take a break) I just threw a lot of information at you
