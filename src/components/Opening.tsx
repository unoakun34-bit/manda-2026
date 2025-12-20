import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface OpeningProps {
  onComplete: () => void;
}

const Opening = ({ onComplete }: OpeningProps) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // --- TEKS INTRO (OPSI 2: JARAK & PERASAAN) ---
  const texts = [
    "Di dunia nyata, kita mungkin asing...",
    "Hanya sekadar lewat tanpa sapa.",
    "Tapi di sini...",
    "Izinkan aku jadi diriku sendiri.",
    "Selamat datang di dunia kecil kita.",
    "Hai, Manda."
  ];

  // Logic Kedip Kursor
  useEffect(() => {
    const timeout2 = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(timeout2);
  }, []);

  // Logic Ketikan (Typewriter)
  useEffect(() => {
    // Kalau sudah selesai semua kalimat
    if (index === texts.length) return;

    // Cek apakah ini kalimat terakhir? Kalau ya, berhenti & jangan dihapus.
    if (index === texts.length - 1 && !reverse && subIndex === texts[index].length) {
      return;
    }

    const timeout = setTimeout(() => {
      // 1. Selesai ngetik satu kalimat -> Tunggu bentar -> Hapus
      if (subIndex === texts[index].length + 1 && !reverse) {
        setReverse(true);
        return;
      }

      // 2. Selesai hapus kalimat lama -> Pindah ke kalimat baru
      if (subIndex === 0 && reverse) {
        setReverse(false);
        setIndex((prev) => prev + 1);
        return;
      }

      // 3. Proses ngetik atau hapus per huruf
      setSubIndex((prev) => prev + (reverse ? -1 : 1));

    }, Math.max(
      reverse ? 50 : subIndex === texts[index].length ? 1500 : 100, // Kecepatan (Hapus: 50ms, Jeda: 1.5s, Ngetik: 100ms)
      parseInt((Math.random() * 150).toString()) // Randomness biar kayak manusia ngetik
    ));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  // Tombol hanya muncul pas kalimat terakhir ("Hai, Manda") selesai diketik
  const showButton = index === texts.length - 1 && subIndex === texts[index].length;

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-center px-6 z-50 fixed top-0 left-0">
        
        {/* Area Teks Typewriter */}
        <h1 className="font-serif text-xl md:text-3xl text-gray-200 tracking-wide leading-relaxed min-h-[80px] max-w-2xl">
            {/* Tampilkan teks sesuai index saat ini */}
            {`${texts[index].substring(0, subIndex)}${blink ? "|" : " "}`}
        </h1>

        {/* Tombol Masuk (Fade In) */}
        {showButton && (
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }} // Muncul pelan-pelan setelah 1 detik
                onClick={onComplete}
                className="mt-12 px-8 py-3 bg-white/5 border border-white/20 rounded-full text-white/80 text-xs md:text-sm tracking-[0.3em] uppercase hover:bg-white/10 hover:text-white transition-all flex items-center gap-3 backdrop-blur-sm group"
            >
                <Sparkles size={14} className="text-yellow-200 group-hover:animate-spin" />
                <span>Masuk ke 2026</span>
                <Sparkles size={14} className="text-yellow-200 group-hover:animate-spin" />
            </motion.button>
        )}
    </div>
  );
};

export default Opening;