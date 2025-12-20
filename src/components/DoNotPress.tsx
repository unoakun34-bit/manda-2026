import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ban, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const DoNotPress = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Biar gak micu kembang api background
    
    // Logic Respon
    if (clickCount < 4) {
      setClickCount(prev => prev + 1);
    } else {
      // LEVEL FINAL: LEDAKAN CINTA
      setClickCount(0); // Reset
      triggerLoveExplosion();
    }
  };

  const triggerLoveExplosion = () => {
    // Confetti bentuk Hati
    const defaults: any = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['heart'],
      colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#C71585']
    };

    confetti({
        ...defaults,
        particleCount: 50,
        scalar: 2
    });

    confetti({
      ...defaults,
      particleCount: 25,
      scalar: 3
    });
    
    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 4
    });
  };

  // Teks Label tombol berdasarkan klik
  const getButtonText = () => {
    switch (clickCount) {
      case 0: return "JANGAN DITEKAN ⚠️";
      case 1: return "Dibilang Jangan! 😤";
      case 2: return "Ngeyel Banget Sih! 🗿";
      case 3: return "Sekali Lagi Awas Ya! 😡";
      case 4: return "Yaudah Nih... ❤️"; // Transisi ke ledakan
      default: return "JANGAN DITEKAN ⚠️";
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // Efek getar makin kenceng kalau makin sering diklik
      animate={clickCount > 0 ? { x: [-2, 2, -2, 2, 0] } : {}}
      onClick={handleClick}
      className={`
        relative px-4 py-2 rounded-full font-bold text-xs shadow-lg transition-all border border-white/20
        ${clickCount >= 4 ? 'bg-pink-500 text-white animate-pulse' : 'bg-red-600 text-white hover:bg-red-700'}
      `}
    >
      <div className="flex items-center gap-2">
        {clickCount >= 4 ? <Heart size={14} className="animate-ping" /> : <Ban size={14} />}
        <span>{getButtonText()}</span>
      </div>
    </motion.button>
  );
};

export default DoNotPress;