import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircleHeart, Sparkles } from 'lucide-react';

const TimeCapsule = () => {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (!message.trim()) {
      alert("Tulis dulu dong, jangan dikosongin! 🥺");
      return;
    }

    // NOMOR WA KAMU
    const phoneNumber = "6288746041375"; 
    
    // Format pesan WA yang lebih "ngena" buat gebetan
    const text = `Hai Azriel! 💌\n\nAda pesan spesial nih dari Manda lewat web:\n\n"${message}"\n\n(Jangan lupa dibales ya! 😝)`;
    
    // Buka WA
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-8 relative group perspective-1000">
      
      {/* Efek Glow Pink/Ungu biar romantis */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      
      <motion.div 
        initial={{ rotateX: 10, opacity: 0 }}
        whileInView={{ rotateX: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="relative bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-pink-400">
            <MessageCircleHeart className="animate-bounce" size={20} />
            <h3 className="font-mono text-sm tracking-widest uppercase font-bold">Pesan Hati</h3>
          </div>
          <Sparkles size={16} className="text-yellow-400" />
        </div>
        
        {/* Deskripsi yang memancing dia buat jujur */}
        <p className="text-xs text-gray-300 mb-4 leading-relaxed font-sans">
          Mumpung lagi di sini, ada yang mau disampain ke aku gak? <br/>
          Boleh harapan, uneg-uneg, atau... <span className="text-pink-400 font-bold italic">pengakuan?</span> 🫣 <br/>
          <span className="text-[10px] text-gray-500">(Tenang, pesannya langsung masuk ke WA aku kok).</span>
        </p>

        {/* Input Area */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ketik sesuatu buat Azriel... (Contoh: Semangat ya belajarnya! atau... Aku sebenernya...)"
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all h-28 resize-none mb-4 placeholder:text-gray-500 font-sans"
        />

        {/* Tombol Kirim */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 py-3 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all border border-white/10"
        >
          <Send size={14} />
          KIRIM SEKARANG 🚀
        </motion.button>

        <div className="mt-3 text-center">
            <p className="text-[9px] text-gray-500 italic">
                *Cie... yang mau ngirim pesan. Ditunggu lho!
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TimeCapsule;