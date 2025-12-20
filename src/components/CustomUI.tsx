import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// --- 1. LOADING SCREEN (Cinematic Breathing Text) ---
export const LoadingScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      {/* Ikon Bintang Berdenyut */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-4"
      >
        <Sparkles className="w-12 h-12 text-manda-gold" />
      </motion.div>
      
      {/* Teks Loading Puitis */}
      <p className="font-serif text-sm tracking-[0.3em] text-gray-400 animate-pulse">
        MENYIAPKAN SEMESTA...
      </p>
    </motion.div>
  );
};

// --- 2. CUSTOM TOAST (Notifikasi Kaca) ---
// Props: message (pesan), onClose (fungsi tutup)
interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const CustomToast = ({ message, onClose }: ToastProps) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50 }} // Muncul dari atas
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-8 left-0 right-0 z-[60] flex justify-center px-4"
        >
          <div className="glass px-6 py-3 rounded-full flex items-center gap-3 cursor-pointer" onClick={onClose}>
            <span className="text-sm font-sans font-medium tracking-wide text-white">
              {message}
            </span>
            {/* Tombol X kecil */}
            <span className="text-xs text-gray-400 hover:text-white">✕</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};