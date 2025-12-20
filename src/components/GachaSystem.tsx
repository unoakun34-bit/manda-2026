import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dices, Sparkles } from 'lucide-react';

const GachaSystem = () => {
  // --- BAGIAN INI YANG KAMU GANTI KATA-KATANYA ---
  const prizes = [
    "Tahun ini bakal makin glowing ✨",
    "Nilai aman, uang jajan nambah 🤑",
    "Bakal sering ditraktir sama aku 🍜", // Modus tipis 1
    "Doi makin peka tahun ini 🫣",
    "Rezeki lancar, bisa checkout keranjang oren 📦",
    "Sehat terus & makin happy!",
    "Jodohmu inisialnya... [Inisial Kamu] 🤫", // Modus tipis 2 (Ganti [Inisial Kamu])
  ];

  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinGacha = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // Efek ngacak kata-kata (Shuffle visual)
    let count = 0;
    const interval = setInterval(() => {
      setResult(prizes[Math.floor(Math.random() * prizes.length)]);
      count++;
      if (count > 20) { // Berhenti setelah 20x ganti (sekitar 2 detik)
        clearInterval(interval);
        const finalResult = prizes[Math.floor(Math.random() * prizes.length)];
        setResult(finalResult);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
      <div className="flex items-center justify-center gap-2 mb-4 text-manda-gold">
        <Dices size={24} />
        <h3 className="font-serif text-lg tracking-widest">HOKI METER 2026</h3>
      </div>

      {/* Area Hasil */}
      <div className="h-20 flex items-center justify-center mb-6">
        {result ? (
          <motion.p
            key={result}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`font-sans font-bold text-lg ${isSpinning ? 'text-gray-400 blur-sm' : 'text-white'}`}
          >
            {result}
          </motion.p>
        ) : (
          <p className="text-gray-500 text-sm italic">Klik tombol buat cek prediksi...</p>
        )}
      </div>

      {/* Tombol Putar */}
      <button
        onClick={spinGacha}
        disabled={isSpinning}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold tracking-wide transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
      >
        {isSpinning ? (
          "Sedang Meramal..."
        ) : (
          <>
            <Sparkles size={18} /> CEK SEKARANG
          </>
        )}
      </button>
    </div>
  );
};

export default GachaSystem;