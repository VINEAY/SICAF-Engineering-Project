import type React from "react";
import { useRef, useState, useEffect } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true); // must start muted for browser compliance
  const [volume, setVolume] = useState(0.6);
  const playTriggered = useRef(false);

  useEffect(() => {
    let succeeded = false;
    const tryPlay = () => {
      if (succeeded || playTriggered.current) return;
      playTriggered.current = true;
      if (typeof window !== "undefined" && window.focus) try { window.focus(); } catch (e) {}
      if (audioRef.current) {
        audioRef.current.muted = false;
        setMuted(false);
        audioRef.current.volume = volume;
        const playPromise = audioRef.current.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise.then(() => {
            succeeded = true;
            setPlaying(true);
          }).catch(() => {
            setPlaying(false);
            playTriggered.current = false;
          });
        } else {
          succeeded = true;
          setPlaying(true);
        }
      }
    };

    // Type-safe event targets array
    type EventInfo = {
      eventName: string;
      target: Window | Document | HTMLElement;
    };

    const events: EventInfo[] = [
      { eventName: "click", target: window },
      { eventName: "keydown", target: window },
      { eventName: "scroll", target: window },
      { eventName: "wheel", target: window },
      { eventName: "mousedown", target: window },
      { eventName: "mousemove", target: window },
      { eventName: "touchstart", target: window },
      { eventName: "click", target: document.body },
      { eventName: "keydown", target: document.body },
      { eventName: "scroll", target: document.body },
      { eventName: "wheel", target: document.body },
      { eventName: "mousedown", target: document.body },
      { eventName: "mousemove", target: document.body },
      { eventName: "touchstart", target: document.body },
    ];

    const onUserGesture = () => {
      tryPlay();
      // If successful, remove all listeners forever
      if (playing) {
        events.forEach(({ eventName, target }) =>
          target.removeEventListener(eventName, onUserGesture)
        );
      }
    };

    events.forEach(({ eventName, target }) =>
      target.addEventListener(eventName, onUserGesture)
    );

    // Try immediately
    tryPlay();

    return () => {
      events.forEach(({ eventName, target }) =>
        target.removeEventListener(eventName, onUserGesture)
      );
    };
  }, [volume, playing]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };
  const handleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number.parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) audioRef.current.volume = newVol;
  };
  const bars = 7;
  return (
    <div className="fixed bottom-6 left-6 z-[9998] bg-white/90 shadow-xl rounded-full flex items-center px-5 py-2 gap-3 border border-slate-200 backdrop-blur-lg transition">
      <audio
        ref={audioRef}
        src="/bg-music.mp3"
        loop
        muted={muted}
        preload="auto"
        onEnded={() => setPlaying(false)}
        style={{ display: "none" }}
      />
      {/* Pulsing ring if unmuted+playing */}
      <span aria-hidden className={`relative flex items-center justify-center mr-1`}>
        <span
          className={`absolute inline-block rounded-full border-2 border-[#00778D] transition opacity-60 ${playing && !muted ? "animate-bg-music-pulse" : "opacity-0"}`}
          style={{ left: -5, top: -5, width: 38, height: 38, pointerEvents: 'none' }}
        />
        <button
          aria-label={playing ? "Pause background music" : "Play background music"}
          onClick={handlePlayPause}
          className="transition rounded-full p-1 relative bg-white/80 hover:bg-primary/10 focus:bg-primary/10"
        >
          {playing ? <Pause className="w-5 h-5 text-[#00778D]" /> : <Play className="w-5 h-5 text-[#00778D]" />}
        </button>
      </span>
      {/* Equalizer bars: show only when playing and not muted */}
      <div className="h-6 flex items-end gap-[2px] w-8 ml-1">
        {[...Array(bars)].map((_, i) => (
          <div
            key={`bar${i}`}
            className={`w-[3px] bg-[#00778D] rounded-md transition-opacity duration-300 ${playing && !muted ? "opacity-90" : "opacity-30"}`}
            style={{
              height: playing && !muted ? `${8 + 14 * ((i%3)+1)/bars + Math.random() * 8}px` : "8px",
              animation: playing && !muted ? `eqbar 0.9s ${0.08 * i}s infinite linear` : "none",
            }}
          />
        ))}
      </div>
      <button
        aria-label={muted ? "Unmute music" : "Mute music"}
        onClick={handleMute}
        className="transition rounded-full p-1 hover:bg-primary/10"
      >
        {muted ? <VolumeX className="w-5 h-5 text-slate-500" /> : <Volume2 className="w-5 h-5 text-[#00778D]" />}
      </button>
      <input
        type="range"
        aria-label="Music volume"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolume}
        className="accent-primary w-24 outline-none"
        style={{ accentColor: '#00778D' }}
        disabled={muted}
      />
      <style global jsx>{`
        @keyframes eqbar {
          0% { transform: scaleY(0.85); }
          16% { transform: scaleY(1.5); }
          32% { transform: scaleY(0.9); }
          48% { transform: scaleY(1.3); }
          64% { transform: scaleY(0.7); }
          80% { transform: scaleY(1.1); }
          100% { transform: scaleY(0.85); }
        }
        .animate-bg-music-pulse {
          animation: bg-music-pulse 1.35s cubic-bezier(0.66,0,0,1) infinite;
        }
        @keyframes bg-music-pulse {
          0% { opacity:0.55; transform:scale(1); }
          60% { opacity:0.08; transform:scale(1.7); }
          100% { opacity:0.0; transform:scale(2.0); }
        }
      `}</style>
    </div>
  );
}
