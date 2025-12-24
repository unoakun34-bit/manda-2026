import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ChevronRight } from 'lucide-react';

interface StoryProps {
  onFinished: () => void;
}

const Story = ({ onFinished }: StoryProps) => {
  // --- KONFIGURASI PESAN DI SINI ---
  const messages = [
    "Halo, Manda...", 
    "Siap-siap ganti tahun nih.",
    "Sayang banget belum bisa liat kembang api bareng...",
    "Tapi aku tetep seneng bisa kenal deket sama kamu di tahun ini.",
    "Makasih udah jadi bagian cerita aku di tahun ini.",
    "Semoga 2026 jadi tahun yang lebih seru buat kita.",
    "Sebelum lanjut, main game bentar yuk..."
  ];

  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false); // Tombol muncul setelah ngetik selesai

  const handleNext = () => {
    if (index < messages.length - 1) {
      setShowButton(false); // Sembunyiin tombol dulu
      setIndex(prev => prev + 1); // Ganti pesan
    } else {
      onFinished(); // Kalau pesan habis, pindah ke Scene Wish
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative z-10">
      <AnimatePresence mode='wait'>
        <motion.div
          key={index} // Kunci animasi ganti teks
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center"
        >
          {/* Teks Typewriter */}
          <div className="font-serif text-xl md:text-3xl leading-relaxed text-gray-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] min-h-[100px] flex items-center justify-center">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(messages[index])
                  .callFunction(() => {
                    // Pas selesai ngetik, munculin tombol Lanjut
                    setTimeout(() => setShowButton(true), 1000); 
                  })
                  .start();
              }}
              options={{
                delay: 35, // Kecepatan ngetik (makin kecil makin cepet)
                cursor: '|', // Kursor kedip
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Tombol Lanjut (Hanya muncul kalau teks selesai diketik) */}
      {showButton && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleNext}
          className="mt-12 text-white/50 hover:text-white transition-colors flex flex-col items-center gap-2 group"
        >
          <span className="text-xs tracking-widest uppercase">Lanjut</span>
          <ChevronRight className="w-6 h-6 animate-bounce group-hover:text-manda-accent transition-colors" />
        </motion.button>
      )}
    </div>
  );
};

export default Story;