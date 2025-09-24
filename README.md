# Neural Chat Game

A tiny, sandbox-friendly voxel world with **AI NPC chat** and **push-to-talk voice**.
No Pointer Lock required. Runs as a single HTML file.

## Project Demo

<div align="center">
  <a href="https://www.youtube.com/watch?v=KAclbo9ppKg">
    <img src="https://img.youtube.com/vi/KAclbo9ppKg/0.jpg" alt="Virtual LLMs Demo" width="600" style="border-radius: 8px;">
  </a>
  <br>
  <em>Click the image above to watch the project demo video</em>
</div>

---

## ✨ Features

* **Procedural terrain** with async chunk building (stutter-free loads)
* **Place / mine blocks** with a hotbar (1–5 / mouse wheel / click)
* **Smooth FPS movement** (WASD, Sprint, Crouch, Jump with coyote time & jump buffer)
* **Free-look without Pointer Lock** (or hold RMB to look + release to place)
* **AI NPC chat** (press **T** near an NPC or click them; Chat UI pops up)
* **Push-to-talk voice** (hold **Y** or click 🎤; replies are spoken)
* **Local save / load** to `localStorage`
* **Perf toggles** (view distance, shadows, rebuild world)

---

## 🕹️ Controls

* **Move**: `W A S D`
* **Jump**: `Space`  •  **Sprint**: `Shift`  •  **Crouch**: `Ctrl`
* **Look**: move mouse (Free-look) — or **hold Right-Mouse** to look & release to place
  Toggle look mode with `F`, invert Y with `I`
* **Select block**: `1–5`, `E/Q`, mouse **wheel**, or click a hotbar slot
* **Mine**: Left-click block • **Place**: Right-click (or release after RMB-drag)
* **Talk to AI**: `T` (nearest NPC) or click NPC
* **Voice (push-to-talk)**: hold `Y` or click 🎤
* **Perf**: `V` view distance • `J` shadows • `K` rebuild world
* **World**: `R` reset • `O` save • `P` load

<img width="1915" height="927" alt="image" src="https://github.com/user-attachments/assets/af026086-626c-427e-bc93-9e2eaa334092" />


---

## 🚀 Quick Start

1. **Save** the HTML you have as `index.html` (or keep your filename).
2. **Serve locally** (recommended for mic permissions & CORS):

   * Node: `npx serve .`
   * Python: `python -m http.server 8080`
   * VS Code: “Live Server” extension
3. Open in **Chrome or Edge** (Web Speech API support).
4. Click **Play**. Walk to an NPC & press **T**. Try **Y** to talk.

> It can run from `file://`, but browsers often block mic access or CORS from file URLs. A local server is best.

<img width="1920" height="940" alt="image" src="https://github.com/user-attachments/assets/84b6298d-2e94-49c5-96be-18f8b0954508" />


---

## 🧠 AI Backend (optional)

By default, replies are **mocked** (offline). To connect real models, edit in the HTML:

```html
<script>
  window.AI_CONFIG = {
    mode: 'proxy',
    providers: {
      ChatGPT: { url: 'http://localhost:8787/openai', apiKey: 'sk-...' },
      Mixtral: { url: 'http://localhost:8787/mistral', apiKey: '...' },
      Llama:   { url: 'http://localhost:8787/llama' }
    }
  };
</script>
```

**Expected proxy contract**
The frontend will `POST` JSON to the provider’s `url`:

```json
{
  "model": "ChatGPT",
  "messages": [
    {"role": "system", "content": "You are an NPC inside a voxel game."},
    {"role": "user", "content": "hello!"}
  ]
}
```

Return either:

* OpenAI-style: `{ "choices":[{"message":{"content":"…"}}] }`, **or**
* Simple: `{ "reply":"…" }`

> If `mode` ≠ `'proxy'`, it falls back to friendly **mock replies** so you can play offline.

---

## 🔊 Voice

* **Speech-to-Text**: Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`)
  Works in **Chrome / Edge** desktop. Not available in Firefox/Safari.
* **Text-to-Speech**: `speechSynthesis` (built-in browser TTS)

If you prefer high-quality server TTS (e.g., Piper), add a small HTTP endpoint that returns `audio/wav` and pipe it into an `<audio>` element. The current build uses the safe, zero-install browser TTS.

---

## 🧩 Architecture

* **Three.js (ES Module)** — no external `<script>` tags that can break previewers
* **Async chunk build queue** to avoid long main-thread stalls
* **Block library** with different shapes per material (grass slab, logs, rock, stairs, etc.)
* **Raycast picking** for mine/place + highlight
* **Controller** with friction, coyote time, and auto-step over low obstacles
* **UI**: overlay + hotbar + minimal NPC chat dock
* **Self-tests** run at startup and surface in console + on-screen flash

---

## 💾 Save Format

* Stored in `localStorage` under key **`mini-mc-world-v3`**
* JSON: `{ blocks: [{x,y,z,type}], ... }`
  (NPCs aren’t persisted in the AI-only build by default — easy to add if you need it.)

---

## 🧪 Verify Your Setup (quick checklist)

1. **Console** says `Self-tests: ... passed, 0 failed`
2. Press `O` (save), then `R` (reset), then `P` (load) → your blocks reappear
3. Click an NPC or press `T`, type “hello” → get a reply

   * If stuck on mock replies, check `window.AI_CONFIG.mode === 'proxy'`
4. Hold `Y` → you see “🎙️ listening…” and your words appear in the input

---

## 🛠️ Troubleshooting

* **“Failed to execute 'write' on 'Document': Invalid or unexpected token”**
  Caused by broken string literals (e.g., a newline inside quotes).
  Fix: use `'\n'`, not a literal line break.

* **“Identifier 'X' has already been declared”**
  Don’t include two copies of the script or redeclare variables like `npcModeEl`/`recognition`.
  Use the single ES-module file only.

* **Pointer Lock blocked**
  This project intentionally avoids Pointer Lock (sandbox-safe). Use free-look or RMB-drag.

* **Mic not working**
  Use Chrome/Edge, serve over `http://localhost`, and allow mic permissions.
  If embedded in an iframe, ensure `allow=\"microphone\"` and proper CORS.

* **CORS with proxies**
  Add CORS headers on your backend (e.g., `Access-Control-Allow-Origin: http://localhost:8080`).

---

## 🔧 Extending

* Add more providers: extend `window.AI_CONFIG.providers` and route by model name.
* Persist NPCs: save `{ name, model, x, z }` and re-spawn on load.
* Swap TTS: POST text to your TTS server; `audio.src = URL.createObjectURL(wavBlob)`.

---

## 📁 Project Layout

Single-file app:

```
index.html  # the entire game (Three.js module import)
```

---

## 📜 License

Your call — common choice is MIT:

```
MIT © YourName
```

---

## 🏷️ Alternative Names (if you want options)

* **BlockChat**
* **ChatterCraft**
* **TalkVoxel**
* **NPC Voices**

Want me to tailor the README for your proxy stack (Express/FastAPI/CF Worker) or add Piper TTS wiring notes?
