## Web Midi API

@note - let's change gears and talk about midi
- midi doesn't carry and audio data, only triggers sounds
- like a serial protocol

---

## Brief Into to Midi

`[0x00, 0x00, 0x00]`

3 bytes:
- channel & status
- key (0 - 128)
- velocity (volume)

@note - Commands in linux
- `arecordmidi -l` to get ports
- `aseqdump -p 20:0` to show midi commands in a human readable way
- `amidi -l` to get ports (needed for next step)
- `amidi --dump -p hw:1,0,0` to show raw bytes

---

## Status Bytes

- Note On
- Note Off*
- Control Change

\*Note Off messages sometimes are sent as Note On messages with a velocity of 0

---

## How do we convert from Midi Notes to Frequencies?

- A440 = midi note 69
- https://en.wikipedia.org/wiki/Equal_temperament
- [noteToFrequencyEqualTemperment](https://github.com/mboleary/test-ts-game/blob/music_engine_fe/package/music_engine/src/util/noteToFrequency.ts)

---

## Getting Permission

- [MidiAccess in music_engine](https://github.com/mboleary/test-ts-game/blob/music_engine_fe/package/music_engine/src/subsystem/midi/MidiAccess.ts)

