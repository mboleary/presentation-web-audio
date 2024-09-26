## Web Midi API

@note - 

---

## Brief Into to Midi

`[0x00, 0x00, 0x00]`

3 bytes:
- channel & status
- key (0 - 128)
- velocity (volume)

---

## Status Bytes

- Note On
- Note Off*
- Control Change

\*Note Off messages sometimes are sent as Note On messages with a velocity of 0

---

## Getting Permission

- [MidiAccess in music_engine](https://github.com/mboleary/test-ts-game/blob/music_engine_fe/package/music_engine/src/subsystem/midi/MidiAccess.ts)

