import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const FutureGallery = () => {
  // Daftar slot foto kosong
  const slots = [
    { title: "Photobox Date 📸", rotate: -3 },
    { title: "Nonton Konser/Pensi 🎸", rotate: 2 },
    { title: "Sunset Catching 🌅", rotate: -1 },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-full my-8">
      <h3 className="text-center font-serif text-gray-400 text-sm mb-6 tracking-widest uppercase">
        Memories To Be Created...
      </h3>

      {/* Jemuran Foto */}
      <div className="relative h-1 w-full bg-gray-700 mb-8 rounded-full"></div>

      <div className="flex justify-center gap-2 md:gap-4 overflow-x-auto pb-4 px-2 no-scrollbar">
        {slots.map((slot, idx) => (
          <motion.div
            key={idx}
            initial={{ rotate: slot.rotate }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
            onClick={() => setActiveIndex(idx === activeIndex ? null : idx)}
            className="relative flex-shrink-0 w-28 md:w-32 bg-white p-2 pb-8 shadow-xl cursor-pointer transition-all"
          >
            {/* Paku Jemuran */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-4 bg-gray-400 rounded-full z-10"></div>

            {/* Area Foto Hitam (Kosong) */}
            <div className="w-full h-28 md:h-32 bg-gray-900 flex flex-col items-center justify-center text-gray-600 gap-2 overflow-hidden relative group">
               {/* Overlay pas diklik */}
               {activeIndex === idx ? (
                 <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }}
                   className="absolute inset-0 bg-manda-accent/90 flex flex-col items-center justify-center text-white text-center p-1"
                 >
                   <p className="text-[8px] font-bold">MISSION 2026:</p>
                   <p className="text-[10px] leading-tight">Kita harus isi foto ini bareng! 📸</p>
                 </motion.div>
               ) : (
                 <>
                   <Lock size={16} />
                   <span className="text-[8px]">LOCKED</span>
                 </>
               )}
            </div>

            {/* Caption Tulisan Tangan */}
            <p className="absolute bottom-2 left-0 w-full text-center font-script text-gray-800 text-xs md:text-sm">
              {slot.title}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FutureGallery;