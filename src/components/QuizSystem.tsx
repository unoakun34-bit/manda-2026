import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ChevronRight, HelpCircle, MessageCircleHeart, AlertTriangle } from 'lucide-react';

interface QuizProps {
  onFinished: () => void;
}

const QuizSystem = ({ onFinished }: QuizProps) => {
  // --- STATE ---
  const [currentQ, setCurrentQ] = useState(0);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<'neutral' | 'correct' | 'wrong'>('neutral');
  const [feedback, setFeedback] = useState<string>(""); 
  
  // LOGIC BARU: Tracking Ngeyel Per Tombol
  const [wrongStreak, setWrongStreak] = useState(0); 
  const [lastWrongIndex, setLastWrongIndex] = useState<number | null>(null); // Nyimpen index tombol terakhir

  // --- 15 PERTANYAAN ---
  const questions = [
    // BAGIAN 1: INTRO & META
    {
      q: "Cek fokus dulu. Tahun depan tahun berapa?",
      options: [
        { text: "2025", msg: "Yah, gagal move on nih? 🤪" },
        { text: "2026", msg: "Cakep! Fokusnya bagus. Lanjut..." }, // BENAR
        { text: "2077", msg: "Kejauhan woi, kita udah tua nanti 👴👵" }
      ],
      correctIndex: 1
    },
    {
      q: "Jujur, pas pertama kali buka link web ini, reaksi kamu gimana?",
      options: [
        { text: "Apaan sih, Alay", msg: "Parah! Udah begadang bikinnya woi 😭" },
        { text: "Biasa aja", msg: "Masa? Coba liat cermin, pasti senyum-senyum 😏" },
        { text: "Kaget & Senyum dikit", msg: "Nah gitu dong jujur. Manis tau kalo senyum 😉" } // BENAR
      ],
      correctIndex: 2
    },

    // BAGIAN 2: SEKOLAH (BACKSTREET LIFE)
    {
      q: "Di sekolah kita emang pura-pura 'Stranger' (Gak kenal), tapi sebenernya...", 
      options: [
        { text: "Aku emang males liat kamu", msg: "Jahat banget... padahal aku ganteng lho 🥺" },
        { text: "Dalem hati pengen nyapa tapi gengsi", msg: "Sama dong... tahan ya, ada waktunya 🤫" }, // BENAR
        { text: "Biasa aja tuh", msg: "Masa? Mata gak bisa bohong lho... 👀" }
      ],
      correctIndex: 1
    },
    {
      q: "Kalau pas kita papasan di kantin/koridor, mata kamu biasanya ke mana?",
      options: [
        { text: "Liatin lantai", msg: "Lantai lebih menarik dari aku? Sedih... 🥀" },
        { text: "Lirik-lirik dikit", msg: "Ketauan deh! Aku juga liat kamu kok 😎" }, // BENAR
        { text: "Liatin tembok", msg: "Awas nabrak temboknya lho mikirin aku 😆" }
      ],
      correctIndex: 1
    },

    // BAGIAN 3: TENTANG KAMU (TEST OBSERVASI DIA)
    {
      q: "Coba tebak, hal apa dari aku yang paling sering kamu perhatiin diem-diem?",
      options: [
        { text: "Gaya jalan / Penampilan", msg: "Ciye merhatiin detail banget nih... 🫣" }, // BENAR
        { text: "Gak ada", msg: "Tombol ini rusak. Kamu pasti bohong 😝" },
        { text: "Aib kamu", msg: "Dih, yang bagus-bagus napa diingetnya! 😤" }
      ],
      correctIndex: 0
    },
    {
      q: "Menurut kamu, aku tuh orangnya sebenernya gimana?",
      options: [
        { text: "Nyebelin banget", msg: "Nyebelin tapi ngangenin kan? Ngaku! 😜" },
        { text: "Seru & Asik", msg: "Valid! Makanya jangan jutek-jutek dong 😉" }, // BENAR
        { text: "Pendiem", msg: "Salah server bu... aku aslinya rame tau!" }
      ],
      correctIndex: 1
    },

    // BAGIAN 4: KEBIASAAN CHAT (EGO CHECK)
    {
      q: "Kalau aku nge-chat jam 7 malem, Manda biasanya bales jam berapa?",
      options: [
        { text: "Jam 7:01 (Gercep)", msg: "Halah, jangan mimpi! Realistis aja deh 🤣" },
        { text: "Jam 9:00 (Lama)", msg: "Nah sadar diri! Keburu lumutan tau nungguinnya 🗿" }, // BENAR
        { text: "Tahun depan", msg: "Kejam banget! Keburu jadi fosil aku..." }
      ],
      correctIndex: 1
    },
    {
      q: "Kenapa sih Manda susah banget disuruh bilang 'Good Night' atau kata manis?",
      options: [
        { text: "Lupa caranya ngetik", msg: "Alasan klasik. Gak mempan! 😋" },
        { text: "Takut aku baper", msg: "Dih PD banget! Tapi iya sih dikit... 🫣" },
        { text: "Karena Harga Diri & Ego setinggi langit 👑", msg: "Turunin dikit napa Bu Egonya... sekali-kali nyenengin orang 🥺" } // BENAR
      ],
      correctIndex: 2
    },

    // BAGIAN 5: CEK PERASAAN (JEALOUSY & DYNAMIC)
    {
      q: "Misal nih, ada cewek lain di sekolah yang deketin aku. Reaksi Manda?",
      options: [
        { text: "Bodo amat", msg: "Yakin? Awas nanti nyesel lho... 😌" },
        { text: "Panas / Badmood dikit", msg: "Ciye cemburu... tenang, aku setia kok 🔒" }, // BENAR
        { text: "Ikut seneng", msg: "Dih, kok malah didukung? Jahat! 😤" }
      ],
      correctIndex: 1
    },
    {
      q: "Siapa yang paling sering 'Ngalah' kalau kita lagi debat kecil?",
      options: [
        { text: "Aku (Manda)", msg: "Masa? Perasaan kamu batu banget deh 🗿" },
        { text: "Kamu (Yang bikin web)", msg: "Bener banget. Sabar banget kan aku ngadepin kamu? 😇" }, // BENAR
        { text: "Gak ada", msg: "Perang dunia dong kalau gitu..." }
      ],
      correctIndex: 1
    },
    {
      q: "Kalau Manda lagi badmood / marah, biasanya pengen diapain?",
      options: [
        { text: "Didiemin aja", msg: "Yakin? Nanti malah makin ngamuk lho..." },
        { text: "Dibujuk / Dihibur", msg: "Dasar manja... tapi oke siap laksanakan! 🫡" }, // BENAR
        { text: "Diajak berantem", msg: "Waduh, nyari mati itu mah 🏳️" }
      ],
      correctIndex: 1
    },

    // BAGIAN 6: FUTURE PLAN
    {
      q: "Kan kita belum pernah jalan bareng. Kalo nanti 'Debut', enaknya ke mana?",
      options: [
        { text: "KUA langsung", msg: "Waduh... sekolah dulu yang bener ya dek 😂" },
        { text: "Nonton / Timezone", msg: "Gas! Nanti aku yang atur jadwalnya 📅" }, // BENAR
        { text: "Diem di kelas aja", msg: "Bosen kali ah... masa di sekolah mulu 😴" }
      ],
      correctIndex: 1
    },
    {
      q: "Kalau tiba-tiba aku call malem-malem, diangkat gak?",
      options: [
        { text: "Auto Reject", msg: "Jahat banget... awas ya nanti kangen 🥺" },
        { text: "Diangkat dong", msg: "Awas ya kalau bohong, ntar malem aku tes! 📞" }, // BENAR
        { text: "Hape di-silent", msg: "Alasan mulu. Bilang aja grogi kan?" }
      ],
      correctIndex: 1
    },
    
    // BAGIAN 7: THE EFFORT
    {
      q: "Tebak, kira-kira berapa lama aku bikin web spesial ini buat kamu?",
      options: [
        { text: "5 Menit jadi", msg: "Enak aja! Emang mie instan? 🍜" },
        { text: "Semaleman suntuk", msg: "Bener banget... hargai dong effort-nya 🥺❤️" }, // BENAR
        { text: "Nyuruh orang", msg: "Sembarangan! Ini murni ketikan tangan sendiri tau!" }
      ],
      correctIndex: 1
    },

    // BAGIAN 8: FINAL HOPE
    {
      q: "Terakhir. Harapan buat hubungan 'Unik' kita di 2026?",
      options: [
        { text: "Makin deket (Di Real Life juga)", msg: "Amin paling kenceng! Bismillah ya... ✨" }, // BENAR
        { text: "Tetep jadi 'Temen Online' aja", msg: "Masa mau virtual terus? Gak kangen liat aslinya? 😤" },
        { text: "Jadi musuh bebuyutan", msg: "Dih, emang berani musuhan sama aku? 🤨" }
      ],
      correctIndex: 0
    }
  ];

  const handleAnswer = (index: number) => {
    // Kunci jika sudah benar
    if (status === 'correct') return; 

    setClickedIndex(index);
    const correctIdx = questions[currentQ].correctIndex;

    if (index === correctIdx) {
      // --- JIKA BENAR ---
      setStatus('correct');
      setFeedback(questions[currentQ].options[index].msg); 
      setWrongStreak(0); // Reset streak kalau bener
      setLastWrongIndex(null); // Reset tombol terakhir
      
      // JEDA 3 DETIK
      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          setCurrentQ(curr => curr + 1);
          setStatus('neutral');
          setClickedIndex(null);
          setFeedback(""); 
        } else {
          onFinished(); 
        }
      }, 3000); 

    } else {
      // --- JIKA SALAH ---
      setStatus('wrong');
      
      let currentStreak = wrongStreak;
      
      // LOGIC BARU: CEK APAKAH TOMBOL SAMA?
      if (lastWrongIndex === index) {
        // Kalau tombolnya sama kayak sebelumnya, nambah streak
        currentStreak += 1;
      } else {
        // Kalau ganti tombol, reset streak jadi 1
        currentStreak = 1;
      }

      setWrongStreak(currentStreak);
      setLastWrongIndex(index); // Simpan ini sebagai tombol terakhir

      // PESAN NGEYEL (Cuma muncul kalau 3x di tombol yg SAMA)
      if (currentStreak >= 3) {
        setFeedback("Udah salah, ngeyel lagi! Batu banget sih 🗿🔨");
      } else {
        setFeedback(questions[currentQ].options[index].msg);
      }
      
      // Reset visual tombol
      setTimeout(() => {
        setStatus('neutral');
        setClickedIndex(null);
      }, 500);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 z-10 relative">
      <motion.div 
        key={currentQ}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-md bg-black/60 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
      >
        {/* Header Kuis */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-manda-gold opacity-80">
            <HelpCircle size={18} />
            <span className="font-mono text-xs tracking-widest">
              PERTANYAAN {currentQ + 1} / {questions.length}
            </span>
          </div>
          <MessageCircleHeart size={18} className="text-pink-500 animate-pulse" />
        </div>
        
        {/* Soal */}
        <h3 className="font-body text-lg md:text-xl font-bold mb-6 text-white leading-relaxed">
          {questions[currentQ].q}
        </h3>

        {/* Pilihan Jawaban */}
        <div className="flex flex-col gap-3 relative">
          {questions[currentQ].options.map((opt, idx) => {
            let buttonStyle = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-manda-gold/50"; 
            let icon = <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-manda-gold" size={16} />;
            let textStyle = "text-gray-200";

            if (clickedIndex === idx) {
              if (status === 'correct') {
                buttonStyle = "bg-green-500/20 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                icon = <CheckCircle className="text-green-400" size={18} />;
                textStyle = "text-green-100 font-bold";
              } else if (status === 'wrong') {
                buttonStyle = "bg-red-500/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
                icon = <XCircle className="text-red-400" size={18} />;
                textStyle = "text-red-100";
              }
            }

            return (
              <motion.button
                key={idx}
                animate={status === 'wrong' && clickedIndex === idx ? { x: [-5, 5, -5, 5, 0] } : {}}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all font-body text-sm flex justify-between items-center group ${buttonStyle}`}
              >
                <span className={textStyle}>{opt.text}</span>
                {icon}
              </motion.button>
            );
          })}
        </div>

        {/* FEEDBACK AREA */}
        <div className="min-h-[4rem] mt-4 flex items-center justify-center px-2">
          <AnimatePresence mode='wait'>
            {feedback && (
              <motion.div
                key={feedback} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`text-xs md:text-sm font-bold tracking-wide px-4 py-2 rounded-xl text-center flex items-center gap-2 shadow-lg ${
                  status === 'correct' || (status === 'wrong' && wrongStreak >= 3)
                    ? "bg-manda-gold/10 text-manda-gold border border-manda-gold/20" 
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {wrongStreak >= 3 && status === 'wrong' && <AlertTriangle size={18} />}
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
};

export default QuizSystem;