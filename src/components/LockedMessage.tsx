import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LockedMessage = () => { // <--- Nama sudah disesuaikan jadi LockedMessage
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

  const handleUnlock = () => {
    if (password.toLowerCase() === 'amy') {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Password salah, coba ingat lagi... 🤫');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          /* --- TAMPILAN LOCK (SEBELUM DIBUKA) --- */
          <motion.div
            key="locked"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl"
          >
            <motion.div 
              animate={password.length > 0 ? { rotate: [0, -10, 10, 0] } : {}}
              className="mb-6 text-6xl"
            >
              {password.toLowerCase() === 'amy' ? '🔓' : '🔒'}
            </motion.div>

            <h3 className="mb-6 font-serif text-2xl tracking-widest text-white">LOCKED MESSAGE</h3>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password..."
              className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-center text-white outline-none transition-all focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
            />

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mt-4 text-xs italic text-pink-400"
              >
                {error}
              </motion.p>
            )}

            <button
              onClick={handleUnlock}
              className="mt-8 w-full rounded-full bg-white px-8 py-3 text-[10px] font-bold tracking-[0.3em] uppercase text-black transition-all hover:bg-pink-500 hover:text-white"
            >
              Buka Rahasia
            </button>
          </motion.div>
        ) : (
          /* --- TAMPILAN PESAN (SETELAH DIBUKA) --- */
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-black/40 p-8 md:p-12 backdrop-blur-2xl shadow-2xl"
          >
            {/* Dekorasi Sudut */}
            <div className="absolute top-0 left-0 h-16 w-16 border-t border-l border-white/20 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 h-16 w-16 border-b border-r border-white/20 rounded-br-3xl"></div>

            {/* ISI SURAT */}
            <div className="prose prose-invert max-w-none font-serif text-base md:text-lg leading-relaxed text-white/80">
              
              <p className="font-bold text-white text-xl mb-6">Hai, Manda.</p>

              <p>
                Kalau kamu baca ini, berarti kamu cukup kepo buat mecahin kodenya. Selamat ya.
              </p>

              <p>
                Kita ini lucu ya. <strong className="text-white">Sedekat nadi di virtual, tapi sejauh matahari di dunia nyata.</strong>
              </p>

              <p>
                Sebenernya gak ada rahasia besar. Aku cuma mau jujur soal satu hal yang mungkin kamu bertanya-tanya (atau mungkin kamu gak peduli): <br/>
                <span className="italic text-pink-200/80">'Kenapa sih Azriel kalau di sekolah diem aja atau pura-pura gak kenal?'</span>
              </p>

              <p>
                Jujur, itu bukan karena aku sombong. Tapi karena aku <strong className="text-white">minder</strong>.
              </p>

              <p>
                Di mata aku, kamu itu bersinar banget, Man. Sementara aku... ya cuma aku. Kadang ada rasa takut kalau aku deketin kamu di dunia nyata, aku malah ngerusak imej kamu atau bikin kamu risih. Aku ngerasa belum pantas aja.
              </p>

              <p>
                Jadi, maaf ya kalau aku cuma berani rame di chat.
              </p>

              {/* BOX PERINGATAN BEGADANG */}
              <div className="my-8 rounded-lg border-l-4 border-pink-500 bg-pink-500/10 p-4 text-sm text-pink-100/90 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20 text-4xl">😤</div>
                <p className="mb-2">
                  Oh iya, satu lagi. Tolong ya, itu hobi <strong className="text-white decoration-pink-500 underline underline-offset-4">begadang sampai jam 3 pagi</strong> dikurangin. Kemarin pas sakit, dibilangin malah ngeyel <em className="text-white">"gak ngaruh, gak ngaruh"</em>. Dasar batu.
                </p>
                <p className="text-xs opacity-70">
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

              {/* FOOTER / SIGNATURE */}
              <div className="mt-12 pt-6 border-t border-white/10 text-center space-y-4">
                <p className="font-serif text-2xl tracking-[0.2em] text-white">
                  HAPPY ANNIVERSARY
                </p>
                
                <div className="space-y-1">
                  <p className="text-sm italic text-pink-200/60 font-serif">
                    "Keep shining like the sun, and I will be the shadow that never leaves."
                  </p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">
                    (Tetaplah bersinar seperti matahari, dan aku akan menjadi bayangan yang tidak pernah pergi)
                  </p>
                </div>
              </div>

              <p className="text-right mt-8 font-serif italic text-xl text-white/60">
                — Azriel.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LockedMessage; // <--- Export default LockedMessage