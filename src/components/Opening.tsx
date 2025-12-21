import { motion } from 'framer-motion';

interface OpeningProps {
  onComplete: () => void;
}

const Opening = ({ onComplete }: OpeningProps) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-center"
      >
        {/* ANGKA 2026 - Pakai Serif agar mewah */}
        <h1 
          className="mb-4 text-7xl md:text-9xl font-light tracking-[0.1em]" 
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          2026
        </h1>

        {/* TEKS UNTUK MANDA - Spasi lebar */}
        <p 
          className="mb-16 text-xs md:text-sm tracking-[0.8em] font-extralight uppercase opacity-70"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          UNTUK MANDA
        </p>

        {/* INSTRUKSI HEADSET */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="mb-12 flex items-center justify-center gap-3 text-[10px] font-extralight italic tracking-widest"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="text-sm">🎧</span>
          <span>Gunakan Headset biar lebih kerasa feel-nya</span>
        </motion.div>

        {/* TOMBOL BUKA PESAN - Minimalis Bulat */}
        <motion.button
          whileHover={{ scale: 1.05, letterSpacing: "0.4em", backgroundColor: "white", color: "black" }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="rounded-full border border-white/20 px-12 py-3 text-[10px] tracking-[0.3em] uppercase transition-all duration-500 font-light"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Buka Pesan
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Opening;