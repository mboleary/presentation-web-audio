# Sound

---

## A440 (A4)

https://en.wikipedia.org/wiki/A440_(pitch_standard)

<button onclick="s02_a440()">Play</button>

@note - What is the significance?
    - A440 is the "A" above middle C, a standard tuning frequency
    - ISO 16 - formalized in 1975, informal standard since 1920s

---

## Additive Mixing

![additive mixing](assets/add_mix.png)
A4 (440Hz) + D5(587.33Hz)

@note - Talk about how audio is mixed together
- Screenshot from Audacity where 2 waves are combined together
- mention "peaking" if signal too hot

---

## Sample Rate

![Sampling](assets/Signal_Sampling.svg)

44.1kHz (CD Quality) and 48kHz (DVD Quality) are the common standards

@note - Samples are points of sound
    - discrete samples of a continuous waveform
- Nyquist–Shannon sampling theorem: sample rate must be twice the signal bandwidth to avoid aliasing
- mismatching sample rates can lead to artifacting or playback at the wrong speed in some software
    - just like resizing an image

---

Why 44.1khz?

@note - Range of human hearing between roughly 20Hz to 20kHz
    - Given Nyquist–Shannon sampling theorem, we need more than 40k samples to reproduce sounds
- Signal is then typically filtered with a low-pass filter to reduce artifacts