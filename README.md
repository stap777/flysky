# RetroTV

**RetroTV** is a lightweight, high-performance Windows desktop application designed to recreate the spontaneous, nostalgic experience of vintage linear television using your own local media library.

Instead of browsing endless catalogs on on-demand streaming services, RetroTV turns on directly into a live broadcast. Channels run on a synchronized timeline with simulated programming, live progress indicators, and an "Up Next" schedule guide.

---

## The Problem & Vision

Modern on-demand streaming services introduce **decision fatigue**: endless scrolling, algorithmic recommendations, and the constant friction of picking something to watch. 

RetroTV restores the classic, laid-back linear TV experience:
- **Zero-Friction Viewing:** Turn the app on and something is already playing mid-stream.
- **Curated Nostalgia:** Experience vintage TV aesthetics, authentic 4:3 and 16:9 monitor frames, scanlines, and retro broadcast styling.
- **Deterministic 24/7 Scheduling:** Channels follow scheduled time slots calculated from the host system clock so broadcasts feel continuous and alive.
- **Local & Private:** Built to operate entirely offline against your local video files with no external telemetry or cloud dependencies.

---

## Project Status: Stage 1 Desktop Scaffold

> [!NOTE]
> This repository is currently in **Stage 1 (Desktop Scaffold)**. The foundational desktop architecture, native Tauri 2 backend, and polished dark cinematic user interface are implemented and verified. Real media scanning, persistent scheduling, and video playback belong to upcoming development stages.

### Implemented in Stage 1:
- [x] **Tauri 2 Windows Desktop Shell:** Initialized with the native MSVC toolchain targeting `x86_64-pc-windows-msvc`.
- [x] **React 19 + TypeScript + Vite Frontend:** Modern, type-safe frontend with hot-module reloading.
- [x] **Tailwind CSS (v4) Styling:** Curated dark cinematic theme with custom CRT scanline gradients, corner vignette, and screen glow.
- [x] **Live TV Monitor Component:**
  - Responsive monitor frame with aspect-ratio toggle (widescreen `16:9` vs. vintage `4:3` CRT).
  - Floating `LIVE BROADCAST` status indicator with pulsing beacon.
  - Broadcast watermark bug (`RTV-VINTAGE`) and channel badge (`CH 04 • RETRO CLASSICS`).
  - SMPTE 100% color bars test pattern toggle for broadcast standby simulation.
  - Live progress timeline bar with elapsed/remaining time counters and animated VU audio level indicators.
- [x] **Current Program Metadata Card:** Shows program title, episode title, release year, TV rating, duration, genres, synopsis, and crew credits.
- [x] **"Up Next" Schedule Lineup:** Sidebar rail presenting upcoming broadcast lineup with start times, runtimes, and genre tags.
- [x] **Channel Switcher Pill:** Channel selector for switching simulated stations (`CH 02`, `CH 04`, `CH 07`, `CH 09`).
- [x] **Live System Clock:** Header clock synchronized to the host machine's local time.

---

## Roadmap

The development of RetroTV is structured across sequential stages:

- **Stage 1: Desktop Scaffolding & Live UI Shell** *(Completed)*
  - Tauri 2 + React + TypeScript + Tailwind CSS desktop foundation and live TV screen layout.
- **Stage 2: Local Media Scanner & Probe Engine** *(Next)*
  - Background scanning of local video directories (`.mp4`, `.mkv`, `.avi`).
  - Metadata and duration extraction using `ffprobe`.
- **Stage 3: Embedded Database & Catalog Store**
  - Embedded SQLite database storing indexed media, channel configurations, and metadata.
- **Stage 4: Deterministic 24/7 Linear Scheduler**
  - Mathematical scheduling algorithm mapping the current clock time to specific video offsets without needing background rendering.
- **Stage 5: Integrated Video Playback Engine**
  - Seamless native video playback, channel tuning transitions, and audio controls.
- **Stage 6: Interactive Guide (EPG) & Channel Management**
  - Full-screen TV guide grid, custom channel creation, and smart interstitial/commercial bumper insertion.

---

## Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Desktop Shell** | [Tauri 2](https://v2.tauri.app/) | Native Windows desktop runtime with lightweight webview integration |
| **Native Core** | [Rust](https://www.rust-lang.org/) | `stable-x86_64-pc-windows-msvc`, `tauri-build`, `serde` |
| **Compiler & SDK** | Microsoft C++ Build Tools | MSVC `cl.exe` (v19.44+) & Windows SDK `10.0.26100.0+` |
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Type-safe declarative UI components |
| **Bundler & Dev Server** | [Vite 8](https://vite.dev/) | Fast build times with `@vitejs/plugin-react` |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | `@tailwindcss/vite` modern CSS-first configuration |
| **Icons** | [Lucide React](https://lucide.dev/) | Minimalist UI iconography |
| **Multimedia Tooling** | [FFmpeg / FFprobe](https://www.ffmpeg.org/) | System-linked media inspection tooling (verified Gyan build) |

---

## Prerequisites for Windows Development

Ensure the following tools are installed on your machine:

1. **Node.js & npm:**
   - Node.js `v18.0.0` or higher (`v24.x` recommended).
   - Verify with: `node --version` and `npm --version`.
2. **Rust & Cargo:**
   - Install Rust via [rustup](https://rustup.rs/) using the default stable MSVC toolchain:
     ```powershell
     rustup default stable-x86_64-pc-windows-msvc
     ```
   - Verify with: `rustc --version` and `cargo --version`.
3. **Microsoft C++ Build Tools & Windows SDK:**
   - Visual Studio 2022 Build Tools with the **Desktop development with C++** workload.
   - Windows 10/11 SDK (`10.0.26100.0` or newer).
4. **Microsoft Edge WebView2 Runtime:**
   - Installed by default on Windows 10 and 11.
5. **FFmpeg & FFprobe:**
   - Required for upcoming media scanning stages.
   - Recommended install via WinGet:
     ```powershell
     winget install Gyan.FFmpeg -e
     ```

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/stap777/flysky.git
cd flysky
```

### 2. Install Node Dependencies
```bash
npm install
```

### 3. Run in Desktop Development Mode
Starts the Vite development server and launches the native Tauri desktop window:
```bash
npm run tauri dev
```

> [!TIP]
> **Windows Terminal PATH Refresh:**
> If you recently installed Rust or FFmpeg, make sure to launch your commands from a fresh terminal window so the newly added entries in `PATH` (`~/.cargo/bin` and WinGet links) are recognized.

### 4. Run Frontend-Only Development (Browser)
If you want to rapidly prototype UI components in your browser without launching the native desktop window:
```bash
npm run dev
```
Navigate to `http://localhost:1420` in your web browser.

---

## Verification & Build Commands

### Frontend Production Build
Validates TypeScript compilation and generates optimized production assets in `dist/`:
```bash
npm run build
```

### Rust Core Check
Verifies native Rust code and Tauri dependencies without linking:
```bash
cd src-tauri
cargo check
```

### Full Desktop Production Binary
Compiles the optimized Windows desktop executable (`.exe`):
```bash
npm run tauri build
```
The compiled binary will be located in `src-tauri/target/release/`.

---

## Project Structure

```
flysky/
├── src/                          # React + TypeScript frontend
│   ├── assets/                   # Static media and logos
│   ├── App.css                   # Tailwind v4 import & custom CRT styling
│   ├── App.tsx                   # Live TV player container, program info & Up Next
│   ├── main.tsx                  # React DOM mount point
│   └── vite-env.d.ts             # Vite client TypeScript declarations
├── src-tauri/                    # Rust native application core
│   ├── capabilities/             # Tauri 2 window permissions & security configuration
│   │   └── default.json
│   ├── icons/                    # Desktop application icons
│   ├── src/
│   │   ├── lib.rs                # Tauri application builder & IPC handlers
│   │   └── main.rs               # Windows entry point
│   ├── build.rs                  # Tauri build script
│   ├── Cargo.toml                # Rust crate manifest & dependencies
│   └── tauri.conf.json           # Tauri 2 configuration (window size, title, devUrl)
├── index.html                    # Root HTML document
├── package.json                  # NPM dependencies, scripts, and metadata
├── tsconfig.json                 # TypeScript compiler configuration
├── tsconfig.node.json            # Vite TypeScript configuration
├── vite.config.ts                # Vite configuration with Tailwind CSS plugin
├── .gitignore                    # Git ignore rules for Node, Rust, and Tauri
└── README.md                     # Project documentation
```

---

## Current Limitations

- **Simulated Stream:** Video playback is currently represented by a styled monitor placeholder card and SMPTE color bars; video decoding and playback will be introduced in Stage 5.
- **Static Schedule Data:** Program and schedule information in Stage 1 is hardcoded for interface scaffolding and will be replaced by the deterministic scheduler and local database in Stages 3 and 4.
- **Platform Focus:** Initial development and testing are focused on 64-bit Windows (`x86_64-pc-windows-msvc`). Cross-platform support (macOS/Linux) is planned for future releases.

---

## License

This project is licensed under the MIT License.
