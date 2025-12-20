import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const RateMyEffort = () => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRate = (index: number) => {
    // Kalau pilih bintang 1-4, kasih efek getar (pura-pura error/nolak)
    if (index < 5) {
      const form = document.getElementById('star-container');
      form?.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(0)' }
      ], { duration: 200 });
      return; // Gak simpen ratingnya
    }

    // Kalau bintang 5 baru sukses
    setRating(index);
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#FFD700', '#FFA500']
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto text-center mt-10 mb-6">
      {!submitted ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <p className="text-gray-300 text-xs font-bold mb-4 uppercase tracking-widest">
            Rate My Effort 🥺
          </p>
          
          <div id="star-container" className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRate(star)}
                className="text-gray-600 hover:text-yellow-400 transition-colors focus:outline-none"
              >
                <Star 
                  size={28} 
                  fill={star <= rating ? "#FACC15" : "none"} 
                  className={star <= rating ? "text-yellow-400" : "text-gray-600"}
                />
              </motion.button>
            ))}
          </div>
          <p className="text-[9px] text-gray-500 italic mt-2">
            (Coba klik bintang 1 kalo berani 😤)
          </p>
        </div>
      ) : (
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-500/20 border border-green-500/50 rounded-2xl p-6 flex flex-col items-center gap-2"
        >
          <Heart className="text-green-400 fill-green-400 animate-bounce" size={32} />
          <h3 className="text-white font-bold">Yeay! Makasih ⭐⭐⭐⭐⭐</h3>
          <p className="text-xs text-gray-300">
            Bayarannya transfer pake senyuman pas ketemu besok ya!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default RateMyEffort;