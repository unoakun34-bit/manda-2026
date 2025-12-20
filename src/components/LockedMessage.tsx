import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, AlertCircle } from 'lucide-react';

const LockedMessage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // PASSWORD (Huruf kecil semua)
  const CORRECT_PASSWORD = 'amy'; 

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === CORRECT_PASSWORD) {
      setIsOpen(true);
      setError(false);
    } else {
      setError(true);
      const form = document.getElementById('lockForm');
      form?.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(0)' }
      ], { duration: 300 });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 mb-24 px-4">
      <AnimatePresence mode='wait'>
        
        {/* KEADAAN TERKUNCI */}
        {!isOpen ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/10 rounded-full text-manda-gold animate-pulse">
                <Lock size={24} />
              </div>
            </div>
            
            <h3 className="font-serif text-lg text-white mb-2 tracking-wide">
              TOP SECRET ARCHIVE
            </h3>
            
            <p className="text-xs text-gray-400 mb-6 italic">
              Clue: Nama panggilan dariku yang dulu pernah kamu tolak. 🥀
            </p>

            <form id="lockForm" onSubmit={handleUnlock} className="flex flex-col gap-3">
              <div className="relative">
                <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Masukkan password..."
                  className="w-full bg-black/40 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-manda-gold transition-colors text-center placeholder:text-gray-600"
                />
              </div>
              
              {error && (
                <span className="text-[10px] text-red-400 flex items-center justify-center gap-1">
                  <AlertCircle size={10} /> Password salah. Coba inget-inget lagi.
                </span>
              )}

              <button 
                type="submit"
                className="w-full bg-manda-gold/20 text-manda-gold border border-manda-gold/50 py-2.5 rounded-xl text-sm font-bold hover:bg-manda-gold hover:text-black transition-all"
              >
                BUKA GEMBOK 🔓
              </button>
            </form>
          </motion.div>
        ) : (
          
          /* KEADAAN TERBUKA (ISI SURAT) */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#fff9f0] text-gray-800 rounded-sm p-6 md:p-8 shadow-2xl relative overflow-hidden font-serif"
          >
            {/* Hiasan Kertas */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 opacity-50"></div>
            <Unlock size={20} className="text-gray-400 mb-4 mx-auto" />

            <div className="prose prose-sm max-w-none text-left leading-relaxed space-y-4">
              <p className="font-bold text-center border-b border-gray-300 pb-4 mb-4 text-sm tracking-widest uppercase">
                CONFIDENTIAL MESSAGE
              </p>

              <p>Hai, Manda.</p>

              <p>
                Kalau kamu baca ini, berarti kamu cukup kepo buat mecahin kodenya. Selamat ya.
              </p>

              <p>
                Kita ini lucu ya. <strong>Sedekat nadi di virtual, tapi sejauh matahari di dunia nyata.</strong>
              </p>

              <p>
                Sebenernya gak ada rahasia besar. Aku cuma mau jujur soal satu hal yang mungkin kamu bertanya-tanya (atau mungkin kamu gak peduli): <br/>
                <em>'Kenapa sih Azriel kalau di sekolah diem aja atau pura-pura gak kenal?'</em>
              </p>

              <p>
                Jujur, itu bukan karena aku sombong. Tapi karena aku <strong>minder</strong>.
              </p>

              <p>
                Di mata aku, kamu itu bersinar banget, Man. Sementara aku... ya cuma aku. Kadang ada rasa takut kalau aku deketin kamu di dunia nyata, aku malah ngerusak imej kamu atau bikin kamu risih. Aku ngerasa belum pantas aja.
              </p>

              <p>
                Jadi, maaf ya kalau aku cuma berani rame di chat.
              </p>

              {/* BAGIAN BARU: BEGADANG */}
              <div className="bg-red-50 border-l-2 border-red-300 pl-3 py-1 my-4 italic text-gray-700">
                <p>
                  Oh iya, satu lagi. Tolong ya, itu hobi <strong>begadang sampai jam 3 pagi</strong> dikurangin. Kemarin pas sakit, dibilangin malah ngeyel <em>"gak ngaruh, gak ngaruh"</em>. Dasar batu. 😤
                </p>
                <p className="mt-1">
                  Aku ngomel gini karena aku peduli. Jaga kesehatan, Man. Aku gak mau liat kamu sakit lagi.
                </p>
              </div>

              <p>
                Tenang aja, aku gak bakal nuntut status apa-apa. Cuma mau bilang: Aku nyaman ngobrol sama kamu. Tolong jangan berubah ya, tetep jadi Manda yang asik, jutek, dan gengsian kayak biasa.
              </p>

              <p>
                Jadi, biarlah aku jadi pengagum rahasiamu di 'bawah tanah' dulu ya?
              </p>

              <p>
                Semangat terus ya. Kalau dunia lagi jahat sama kamu, chat aku selalu terbuka 24 jam.
              </p>
              
              <div className="mt-8 pt-4 border-t border-gray-300/50 text-center space-y-2">
                <p className="font-bold text-lg tracking-wider text-gray-900">
                  Happy Anniversary.
                </p>
                
                <p className="text-xs italic text-gray-600 font-serif px-4">
                  "Keep shining like the sun, and I will be the shadow that never leaves."
                </p>
                
                <p className="text-[10px] text-gray-400">
                  (Tetaplah bersinar seperti matahari, dan aku akan menjadi bayangan yang tidak pernah pergi).
                </p>
              </div>

              <p className="text-right mt-6 font-script text-xl text-gray-600">
                — Azriel.
              </p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default LockedMessage;