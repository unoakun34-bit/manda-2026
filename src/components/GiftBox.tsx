import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Ticket, ChevronRight, MessageCircle, Clock, Coffee, Ear, BookOpen, X, Crown, Phone, Zap, HeartHandshake, Video, AlarmClock, Camera, ShieldAlert } from 'lucide-react';

const GiftBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // DATA KUPON SPESIAL (Privilege Card)
  const coupons = [
    {
      id: 1,
      title: "Tiket Anti Kacang 🥜",
      desc: "Pakai kupon ini, azriel WAJIB bales chat manda dalam 1 menit. Gak boleh alesan ketiduran, gaming, atau lagi boker.",
      icon: <Clock size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-blue-400 to-blue-600",
      waMsg: "Aku mau klaim Tiket Anti Kacang! Bales cepet dong, darurat nih! 😤"
    },
    {
      id: 2,
      title: "Kartu 'Manda Selalu Bener' 👑",
      desc: "Lagi debat? Pake kartu ini, otomatis azriel yang salah dan manda yang menang. Berlaku untuk segala jenis perdebatan.",
      icon: <Crown size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-yellow-400 to-orange-500",
      waMsg: "Aku pake Kartu 'Manda Selalu Bener'. Jadi kamu harus ngalah sekarang juga! 👑"
    },
    {
      id: 3,
      title: "Jasa Temen Begadang 🦇",
      desc: "Manda belum ngantuk jam 2 pagi? Panggil azriel. Aku siap nemenin chat/call sampe manda ketiduran (walau mataku 5 watt).",
      icon: <Phone size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-purple-500 to-indigo-600",
      waMsg: "Woi, temenin begadang dong. Jangan tidur dulu! 🦇"
    },
    {
      id: 4,
      title: "Traktiran Jajan Eskrim 🍦",
      desc: "Tukarkan ini di sekolah/luar. Azriel beliin jajan apa aja (Menu bebas pilih, asal jangan minta beli pabriknya aja). Yuk gass!",
      icon: <Ticket size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-pink-400 to-rose-500",
      waMsg: "Nagih janji! Kapan nih traktiran jajan eskrim-nya? 🍦"
    },
    {
      id: 5,
      title: "Peredam Mode Maung 🦁",
      desc: "Lagi badmood/PMS? Aktifin ini, azriel bakal ngehibur, ngelawak garing, atau jadi pendengar setia sampe mood kamu balik.",
      icon: <Zap size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-red-500 to-red-700",
      waMsg: "Lagi badmood nih. Buruan hibur aku sekarang! Awas kalo garing! 🦁"
    },
    {
      id: 6,
      title: "Free Call 'Kangen' 🤙",
      desc: "Berlaku kapan aja. Kalau manda kangen (atau gabut), telepon aja. Pasti diangkat. Kalau gak diangkat, spam aja.",
      icon: <HeartHandshake size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
      waMsg: "Ehem... mau pake kupon Free Call nih. Siap-siap ya! 🤙"
    },
    {
      id: 7,
      title: "Tiket VC Dadakan 📹",
      desc: "Bebas Video Call kapan aja tanpa janjian. Azriel wajib angkat (kecuali lagi di WC atau ....).",
      icon: <Video size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-indigo-500 to-blue-500",
      waMsg: "Mau pake Tiket VC Dadakan! Angkat bentar, penting (bohong deng, kangen doang)."
    },
    {
      id: 8,
      title: "Jasa Alarm Manusia ⏰",
      desc: "Takut telat bangun pagi? Atau mau dibangunin sahur? Azriel siap telpon/spam chat sampe manda beneran bangun.",
      icon: <AlarmClock size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-red-400 to-orange-500",
      waMsg: "Besok bangunin aku jam ... (isi jamnya). Awas telat banguninnya! ⏰"
    },
    {
      id: 9,
      title: "Bantuan PR / Tugas 📚",
      desc: "Lagi pusing tugas sekolah? Sini azriel bantuin (atau seenggaknya aku temenin pusing bareng biar adil).",
      icon: <BookOpen size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-green-500 to-emerald-600",
      waMsg: "Pusing tugas nih. Bantuin kerjain dong (atau semangatin kek)! 📚"
    },
    {
      id: 10,
      title: "Sesi Gibah VIP ☕",
      desc: "Ada hot news di sekolah? Ceritain ke azriel. Azriel siap jadi pendengar setia dan 'kompor' yang baik.",
      icon: <Coffee size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-yellow-500 to-amber-600",
      waMsg: "Urgent! Ada gosip panas nih. Siap-siap dengerin curhatan aku! ☕"
    },
    {
      id: 11,
      title: "Request PAP Aib 📸",
      desc: "Kamu boleh minta azriel kirim foto apa aja. Foto muka bantal? Foto aib pas kecil? Foto lagi melongo? Gass.",
      icon: <Camera size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-pink-500 to-rose-500",
      waMsg: "Klaim Request PAP! Kirim foto kamu yang lagi... (isi sendiri) 📸"
    },
    {
      id: 12,
      title: "Perlindungan Anti-Ghosting 🛡️",
      desc: "Kalau azriel ngilang tanpa kabar > 1 jam, manda berhak spam chat sampe HP aku meledak.",
      icon: <ShieldAlert size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-slate-600 to-gray-700",
      waMsg: "Kamu ngilang kemana?! Aktifin Proteksi Anti-Ghosting sekarang! Muncul gak! 🛡️"
    },
    {
      id: 8,
      title: "Tong Sampah Emosi 👂",
      desc: "Lagi kesel sama temen/guru/ortu? Luapin ke azriel. Azriel gak bakal nge-judge, cuma dengerin dan dukung kamu.",
      icon: <Ear size={32} className="text-white" />,
      bg: "bg-gradient-to-br from-cyan-500 to-blue-600",
      waMsg: "Lagi emosi berat nih. Mau marah-marah, dengerin ya! 👂"
    }
  ];

  const handleNext = () => {
    if (currentIndex < coupons.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop balik ke awal
    }
  };

  const handleClaim = (msg: string) => {
    const phoneNumber = "6288746041375"; // GANTI NOMOR WA KAMU DISINI
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="w-full max-w-sm mx-auto my-6 perspective-1000">
      
      <AnimatePresence mode='wait'>
        {/* KEADAAN 1: KOTAK BELUM DIBUKA */}
        {!isOpen ? (
          <motion.div 
            key="box"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            <motion.div 
              animate={{ rotate: [-2, 2, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              className="relative w-32 h-32 bg-gradient-to-tr from-red-600 to-pink-500 rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.6)] flex items-center justify-center border-4 border-yellow-400/30"
            >
              {/* Pita Kado */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-full bg-yellow-400/80 shadow-sm"></div>
                <div className="absolute w-full h-8 bg-yellow-400/80 shadow-sm"></div>
              </div>
              <Gift size={48} className="text-white z-10 animate-bounce" />
            </motion.div>
            
            <div className="text-center">
              <h3 className="text-white font-bold text-lg animate-pulse">Special Gift 🎁</h3>
              <p className="text-[10px] text-gray-400">Tap untuk buka kado</p>
            </div>
          </motion.div>
        ) : (
          /* KEADAAN 2: KUPON MUNCUL */
          <motion.div 
            key="coupon"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-2">
                 <Ticket className="text-yellow-400" size={18} />
                 <span className="text-xs font-bold text-white tracking-widest uppercase">Privilege Card</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                 <X size={18} />
               </button>
            </div>

            {/* KARTU KUPON (Carousel) */}
            <div className="relative h-64 w-full perspective-1000">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentIndex}
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`absolute inset-0 ${coupons[currentIndex].bg} rounded-xl p-5 flex flex-col items-center justify-between shadow-inner border border-white/20 text-center`}
                >
                  {/* Icon & Judul */}
                  <div className="flex flex-col items-center gap-2 mt-2">
                    <div className="p-3 bg-white/20 rounded-full shadow-sm backdrop-blur-sm">
                      {coupons[currentIndex].icon}
                    </div>
                    <h3 className="font-bold text-white text-xl leading-tight">
                      {coupons[currentIndex].title}
                    </h3>
                  </div>

                  {/* Deskripsi */}
                  <p className="text-white/90 text-xs leading-relaxed px-2 font-medium">
                    "{coupons[currentIndex].desc}"
                  </p>

                  {/* Tombol Klaim */}
                  <button 
                    onClick={() => handleClaim(coupons[currentIndex].waMsg)}
                    className="w-full bg-white text-gray-800 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg active:scale-95"
                  >
                    <MessageCircle size={14} />
                    KLAIM SEKARANG
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigasi / Indikator */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1">
                {coupons.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-yellow-400' : 'w-1.5 bg-white/30'}`} 
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="flex items-center gap-1 text-[10px] text-white/70 hover:text-white transition-colors"
              >
                NEXT COUPON <ChevronRight size={12} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GiftBox;