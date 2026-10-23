import { useState, useEffect } from "react";
import {
  Tv,
  Volume2,
  VolumeX,
  Radio,
  Clock,
  Sparkles,
  Film,
  Layers,
  ChevronRight,
  ShieldCheck,
  Disc3,
} from "lucide-react";
import "./App.css";

interface Program {
  id: string;
  time: string;
  title: string;
  episode: string;
  duration: string;
  genre: string;
}

const UP_NEXT_PROGRAMS: Program[] = [
  {
    id: "p1",
    time: "13:45",
    title: "Alfred Hitchcock Presents",
    episode: "S03E01 • \"The Glass Eye\"",
    duration: "26 min",
    genre: "Mystery / Thriller",
  },
  {
    id: "p2",
    time: "14:15",
    title: "The Outer Limits",
    episode: "S01E03 • \"The Architects of Fear\"",
    duration: "51 min",
    genre: "Sci-Fi / Drama",
  },
  {
    id: "p3",
    time: "15:10",
    title: "Columbo",
    episode: "S01E01 • \"Murder by the Book\"",
    duration: "76 min",
    genre: "Detective / Crime",
  },
  {
    id: "p4",
    time: "16:30",
    title: "Star Trek: The Original Series",
    episode: "S01E01 • \"The Man Trap\"",
    duration: "50 min",
    genre: "Sci-Fi / Adventure",
  },
];

const CHANNELS = [
  { id: "ch02", number: "02", name: "Sci-Fi Theater", current: "Forbidden Planet (1956)" },
  { id: "ch04", number: "04", name: "Retro Classics", current: "The Twilight Zone", active: true },
  { id: "ch07", number: "07", name: "Vintage Toons", current: "Looney Tunes Golden Era" },
  { id: "ch09", number: "09", name: "Mystery Vault", current: "Perry Mason (1957)" },
];

export function App() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [aspectRatio43, setAspectRatio43] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeChannel, setActiveChannel] = useState<string>("ch04");
  const [showTestPattern, setShowTestPattern] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#07080c] text-slate-200 select-none overflow-hidden font-sans">
      {/* Top Navigation & Broadcast Status Header */}
      <header className="flex items-center justify-between px-5 py-2.5 bg-[#0d0f17] border-b border-slate-800/80 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 text-white shadow-lg shadow-amber-500/20">
            <Tv className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-wider text-base text-white">RetroTV</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                Stage 1 Desktop
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Windows Desktop Core • Tauri 2</p>
          </div>
        </div>

        {/* Center Channel Selector Pill */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-lg p-1">
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all ${
                activeChannel === ch.id
                  ? "bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Radio className={`w-3 h-3 ${activeChannel === ch.id ? "text-amber-400" : "text-slate-500"}`} />
              <span>CH {ch.number}</span>
            </button>
          ))}
        </div>

        {/* Right Header Status Controls */}
        <div className="flex items-center gap-3 text-xs">
          {/* Live Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/60 border border-red-800/50 text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold tracking-wider text-[11px]">LIVE BROADCAST</span>
          </div>

          {/* Clock */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400/80" />
            <span>{currentTime || "--:--:--"}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute" : "Mute"}
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setAspectRatio43(!aspectRatio43)}
              title={`Toggle Aspect Ratio (${aspectRatio43 ? "4:3 CRT" : "16:9 Widescreen"})`}
              className="px-2 py-1 rounded-md text-[11px] font-mono hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
            >
              {aspectRatio43 ? "4:3" : "16:9"}
            </button>

            <button
              onClick={() => setShowTestPattern(!showTestPattern)}
              title="Toggle Color Bar Test Signal"
              className={`p-1.5 rounded-md transition-colors ${
                showTestPattern ? "bg-amber-500/20 text-amber-300" : "hover:bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Disc3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace: TV Monitor + Schedule Panel */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left / Center: Video Player Placeholder & Program Details */}
        <section className="flex-1 flex flex-col min-w-0 bg-[#0d0f17] border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl">
          {/* Live Video Stage Container */}
          <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden crt-screen">
            {/* Screen Aspect Ratio Frame */}
            <div
              className={`relative bg-[#090b10] border border-slate-800/60 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                aspectRatio43
                  ? "w-auto h-full aspect-[4/3] crt-monitor-frame"
                  : "w-full h-full aspect-video crt-monitor-frame"
              }`}
            >
              {/* Standby / Test Pattern Graphics Background */}
              {showTestPattern ? (
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex-1 tv-test-bars" />
                  <div className="h-10 bg-slate-900 border-t border-slate-800 flex items-center justify-around text-[10px] font-mono text-slate-400">
                    <span>SMPTE TEST SIGNAL</span>
                    <span>100% COLOR BARS</span>
                    <span>RETRO-TV ENGINEERING</span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d18] via-[#090b12] to-[#040508] flex items-center justify-center">
                  {/* Subtle broadcast circular grid background */}
                  <div className="absolute w-[500px] h-[500px] rounded-full border border-amber-500/5 pointer-events-none" />
                  <div className="absolute w-[320px] h-[320px] rounded-full border border-amber-500/10 pointer-events-none" />
                  <div className="absolute w-[160px] h-[160px] rounded-full border border-dashed border-amber-500/15 pointer-events-none" />
                </div>
              )}

              {/* CRT Scanline & Vignette Overlays */}
              <div className="absolute inset-0 crt-scanlines" />
              <div className="absolute inset-0 crt-vignette" />
              <div className="absolute inset-0 crt-glow" />

              {/* Monitor Top Overlay: LIVE badge & Channel Watermark Bug */}
              <div className="relative z-10 flex items-center justify-between p-4">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-red-500/30 text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-sm shadow-red-500" />
                  <span className="text-xs font-bold tracking-wider text-red-400">LIVE FEED</span>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-slate-300 text-xs font-mono">CH 04</span>
                </div>

                <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-white font-mono text-xs font-semibold tracking-wider">
                  RTV-VINTAGE
                </div>
              </div>

              {/* Monitor Center: Broadcast Placeholder Message */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 shadow-lg shadow-amber-500/5">
                  <Film className="w-8 h-8 text-amber-400" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[11px] font-semibold tracking-wide uppercase mb-2 border border-amber-500/20">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Virtual Broadcast Player Placeholder
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-md">
                  The Twilight Zone (1959)
                </h2>
                <p className="text-sm text-slate-300 mt-1 max-w-md drop-shadow">
                  Season 1, Episode 1 • "Where Is Everybody?"
                </p>
                <p className="text-xs text-slate-400/80 mt-2 font-mono">
                  Stage 1 Scaffolding: Ready for Stage 2 FFmpeg / Media Core
                </p>
              </div>

              {/* Monitor Bottom Overlay: Live Progress & Technical Badges */}
              <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-semibold">14:22</span>
                    <span>/</span>
                    <span>25:00</span>
                    <span className="text-slate-500">(-10:38 remaining)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Simulated VU Audio Meter */}
                    <span className="text-[10px] text-slate-400">AUDIO</span>
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-1 h-2 bg-emerald-500 rounded-xs" />
                      <span className="w-1 h-3 bg-emerald-500 rounded-xs" />
                      <span className="w-1 h-2.5 bg-emerald-500 rounded-xs" />
                      <span className="w-1 h-1.5 bg-emerald-500 rounded-xs" />
                      <span className="w-1 h-2 bg-amber-400 rounded-xs" />
                    </div>
                  </div>
                </div>

                {/* Progress Bar with Live Position Marker */}
                <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[57%] bg-gradient-to-r from-amber-500 to-red-500 rounded-full" />
                </div>

                {/* Badges footer inside monitor */}
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5 text-[10px] text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200">1080p 24fps</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200">STEREO 2.0</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200">CC</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Host Clock Synchronized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Program Information Card */}
          <div className="p-4 bg-[#0d0f17] border-t border-slate-800/80">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                    NOW PLAYING
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-medium">
                    TV-PG
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-medium">
                    1959
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-medium">
                    Sci-Fi / Mystery
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Runtime: 25 min</span>
                </div>

                <h1 className="text-lg font-bold text-white tracking-tight">
                  The Twilight Zone: Season 1, Episode 1 — "Where Is Everybody?"
                </h1>

                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  An Air Force pilot finds himself trapped in a completely deserted town with no memory of his past,
                  slowly realizing the terrifying psychological nature of his surroundings.
                </p>

                <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400">
                  <span>
                    <strong className="text-slate-300">Creator:</strong> Rod Serling
                  </span>
                  <span>
                    <strong className="text-slate-300">Starring:</strong> Earl Holliman, James Gregory
                  </span>
                  <span>
                    <strong className="text-slate-300">Director:</strong> Robert Stevens
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Rail: Up Next Lineup & Channel Guide */}
        <aside className="w-80 flex flex-col bg-[#0d0f17] border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl shrink-0">
          <div className="px-4 py-3 bg-[#111420] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-sm text-white tracking-wide">Up Next on CH 04</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              Schedule Guide
            </span>
          </div>

          {/* Up Next List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {UP_NEXT_PROGRAMS.map((item, index) => (
              <div
                key={item.id}
                className="group p-3 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-amber-500/30 hover:bg-slate-900 transition-all cursor-default"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-amber-400">
                    <span>{item.time}</span>
                    <span className="text-[10px] text-slate-500">• In {index === 0 ? "11m" : `${(index + 1) * 35}m`}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{item.duration}</span>
                </div>

                <div className="font-semibold text-xs text-white group-hover:text-amber-200 transition-colors">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{item.episode}</div>

                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/40 text-[10px] text-slate-500">
                  <span>{item.genre}</span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Technical Status Pill */}
          <div className="p-3 bg-[#0a0c12] border-t border-slate-800/80 text-[11px] text-slate-400">
            <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 mb-1">
              <span>SYSTEM ARCHITECTURE</span>
              <span className="text-emerald-400 font-bold">READY</span>
            </div>
            <div className="space-y-0.5 text-[10px]">
              <div className="flex justify-between">
                <span>Native Backend:</span>
                <span className="text-slate-300 font-mono">Rust / Tauri 2</span>
              </div>
              <div className="flex justify-between">
                <span>Compiler:</span>
                <span className="text-slate-300 font-mono">MSVC 19.44 / WinSDK</span>
              </div>
              <div className="flex justify-between">
                <span>Tooling:</span>
                <span className="text-slate-300 font-mono">FFmpeg 9.0.2 Ready</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Bottom Global Status Bar */}
      <footer className="flex items-center justify-between px-4 py-1.5 bg-[#090b10] border-t border-slate-800 text-[11px] text-slate-400 font-mono shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Tauri 2 Core Active
          </span>
          <span className="text-slate-600">|</span>
          <span>Workspace: D:\Desktop\project\flysky</span>
        </div>

        <div className="flex items-center gap-3">
          <span>RetroTV v0.1.0 (Stage 1 Scaffolding)</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Target: Windows Desktop (x86_64-msvc)</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
