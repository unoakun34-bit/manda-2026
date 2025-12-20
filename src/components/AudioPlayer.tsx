import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
}

const AudioPlayer = ({ isPlaying }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      // Set volume ke 50% biar pas
      audioRef.current.volume = 0.5;
      
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error("Audio Play Error:", err);
          // Kalau error autoplay, user mungkin harus interaksi lagi (klik icon speaker)
        });
      }
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      
      // Pancing play lagi kalau tadi gagal autoplay
      if (!isMuted && audioRef.current.paused && isPlaying) {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col items-end gap-2">
      
      {/* 1. INDIKATOR ERROR (Muncul kalau file mp3 hilang) */}
      {error && (
        <div className="bg-red-500/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-md flex items-center gap-2 animate-bounce">
          <AlertCircle size={14} />
          <span>File 'public/musik.mp3' tidak ditemukan!</span>
        </div>
      )}

      {/* 2. PLAYER UTAMA */}
      <audio 
        ref={audioRef} 
        loop 
        onError={() => setError(true)} // Deteksi otomatis jika file rusak/hilang
      >
        {/* Pastikan path ini mengarah ke folder public */}
        <source src="/musik.mp3" type="audio/mp3" />
      </audio>

      {/* 3. TOMBOL VOLUME (Muncul kalau sudah mulai cerita) */}
      {isPlaying && !error && (
        <button 
          onClick={toggleMute}
          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </div>
  );
};

export default AudioPlayer;