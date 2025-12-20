import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface WishProps {
  onExplode: () => void;
}

const Wish = ({ onExplode }: WishProps) => {
  const [progress, setProgress] = useState(0); 
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const hasExploded = useRef(false);

  // --- LOGIC DETEKSI 100% ---
  useEffect(() => {
    if (progress >= 100 && !hasExploded.current) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      hasExploded.current = true;
      
      // Jeda dikit pas penuh biar enak liatnya, baru meledak
      setTimeout(() => {
        onExplode();
      }, 300);
    }
  }, [progress, onExplode]);

  // --- LOGIC TEKAN TOMBOL ---
  const startHold = () => {
    if (hasExploded.current) return;

    setIsHolding(true);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Interval pengisi air (Sekitar 2-3 detik sampai penuh)
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100; 
        return prev + 1.2; // Kecepatan air naik
      });
    }, 20); // Update setiap 20ms biar smooth kayak air
  };

  const endHold = () => {
    if (hasExploded.current) return;

    setIsHolding(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    // Kalau dilepas, air surut lagi (Efek gravitasi)
    const drainInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(drainInterval);
          return 0;
        }
        return prev - 2; // Surut lebih cepat dari ngisi
      });
    }, 10);
    
    // Simpan ref biar bisa dicancel kalau ditekan lagi
    intervalRef.current = drainInterval;
  };

  return (
    <div className="h-full flex flex-col items-center justify-center relative z-10 select-none">
      
      {/* Teks Instruksi */}
      <motion.div 
        animate={{ opacity: isHolding ? 1 : 0.6 }}
        className="text-center mb-16 space-y-3"
      >
        <h3 className="font-serif text-3xl text-white tracking-widest drop-shadow-md">
          MAKE A WISH
        </h3>
        <p className="font-sans text-xs text-gray-400 uppercase tracking-[0.3em] animate-pulse">
          {progress >= 100 ? "TERKABUL! ✨" : (isHolding ? "TAHAN TERUS..." : "TEKAN & TAHAN BINTANGNYA")}
        </p>
      </motion.div>

      {/* KONTAINER BINTANG (TIDAK ADA SHADOW) */}
      <div 
        className="relative cursor-pointer group touch-none"
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={(e) => { e.preventDefault(); startHold(); }}
        onTouchEnd={endHold}
      >
        <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
          
          {/* LAYER 1: BINTANG KOSONG (WADAH) 
              Warna abu-abu gelap biar kontras sama isinya */}
          <Star 
            className="w-full h-full text-gray-800" 
            strokeWidth={1.5} // Garis tipis elegan
          />

          {/* LAYER 2: AIR EMAS (MENGISI) 
              Kita pakai teknik 'clipPath' buat motong bintangnya */}
          <div 
            className="absolute top-0 left-0 w-full h-full transition-all ease-linear"
            style={{ 
              // INI KUNCINYA: Memotong dari atas ke bawah.
              // duration-100 di class bikin naik turunnya smooth kayak cairan
              clipPath: `inset(${100 - progress}% 0 0 0)`,
              transitionDuration: '50ms' // Responsif tapi smooth
            }}
          >
            {/* Bintang Full Kuning (Tanpa Shadow) */}
            <Star 
              className="w-full h-full text-yellow-400 fill-yellow-400" 
              strokeWidth={0} // Tanpa garis pinggir, full warna
            />
          </div>

        </div>
      </div>

      {/* Progress Angka (Opsional: Kalau mau polos hapus aja div ini) */}
      <div className="mt-10 font-mono text-yellow-500 text-sm h-6 font-bold tracking-widest">
        {progress > 0 && progress < 100 && `${Math.round(progress)}%`}
      </div>

    </div>
  );
};

export default Wish;