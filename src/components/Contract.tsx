import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSignature, Stamp, MousePointer2, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas'; // Import alat foto

const Contract = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Ref untuk menandai area mana yang mau difoto
  const cardRef = useRef<HTMLDivElement>(null);

  // LOGIC DOWNLOAD GAMBAR
  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    setIsDownloading(true);

    try {
      // Tunggu sebentar biar icon download gak ikut kefoto (opsional)
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#fdfbf7', // Pastikan background kertasnya kebawa
        scale: 2, // Kualitas HD (biar gak pecah di HP)
      });

      // Convert ke link download
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "Surat-Perjanjian-Manda-2026.png";
      link.click();
    } catch (error) {
      console.error("Gagal download:", error);
      alert("Gagal menyimpan gambar. Coba screenshot manual aja ya! 😅");
    }

    setIsDownloading(false);
  };

  const getNoText = () => {
    const texts = ["Gak Mau 😝", "Eits Gak Kena! 🤪", "Jangan Nolak Dong 🥺", "Tombol Rusak 🔧", "Yakin? 🤨", "Udah Setuju Aja ❤️", "Ngeyel Ih! 🗿"];
    return texts[noCount % texts.length];
  };

  const moveButton = () => {
    const randomX = Math.random() * 150 - 75;
    const randomY = Math.random() * 150 - 75;
    setPosition({ x: randomX, y: randomY });
    setNoCount(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-6 perspective-1000">
      
      {/* AREA INI YANG AKAN DIFOTO (ref={cardRef}) */}
      <motion.div 
        ref={cardRef} 
        initial={{ rotateX: 10, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        className="bg-[#fdfbf7] text-black p-6 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-[8px] border-double border-gray-300 relative overflow-hidden"
      >
        {/* Header */}
        <div className="text-center border-b-2 border-black pb-4 mb-4">
          <div className="flex justify-center mb-2 text-gray-800">
            <FileSignature size={32} />
          </div>
          <h3 className="font-serif font-bold text-xl tracking-wide uppercase underline decoration-2 underline-offset-4">
            SURAT PERJANJIAN
          </h3>
          <p className="font-mono text-[10px] text-gray-500 mt-1">No: 001/CINTA/2026</p>
        </div>

        {/* Isi */}
        <div className="font-sans text-sm leading-relaxed space-y-3 mb-6">
          <p>Saya yang bertanda tangan di bawah ini (Manda), dengan kesadaran penuh dan tanpa paksaan (sedikit), berjanji untuk:</p>
          <ul className="list-decimal pl-5 space-y-1 font-semibold text-gray-800">
            <li>Mengurangi gengsi setinggi langit. 📉</li>
            <li>Balas chat kurang dari 10 menit. ⚡</li>
            <li>Gak jutek-jutek lagi ke [Nama Kamu]. 😇</li>
            <li>Mengakui kalau sebenernya kangen. 🫣</li>
          </ul>
        </div>

        {/* Tanda Tangan Area */}
        <div className="relative h-24 flex items-center justify-between gap-2 mt-4">
          
          {/* Materai */}
          <div className="absolute left-0 bottom-0 w-16 h-20 border border-blue-300 bg-blue-50 flex flex-col items-center justify-center text-[8px] text-blue-400 opacity-80">
            <span className="font-bold">METERAI</span>
            <span className="text-xs font-serif text-red-500">10000</span>
            <span className="text-[6px]">DJP 2026</span>
          </div>

          <AnimatePresence mode='wait'>
            {isAgreed ? (
              // JIKA SUDAH SETUJU -> MUNCUL STEMPEL + TOMBOL DOWNLOAD
              <div className="w-full flex flex-col items-end gap-2 z-10">
                 {/* Visual Stempel */}
                <motion.div 
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2 mb-2 mr-4"
                >
                  <Stamp className="text-green-600 rotate-[-15deg]" size={40} />
                  <span className="font-serif text-2xl font-bold text-green-600 border-2 border-green-600 px-2 py-1 rotate-[-10deg] rounded opacity-80">
                    SAH / ACC
                  </span>
                </motion.div>

                {/* Tombol Download (Akan hilang sebentar pas difoto kalau mau rapi, tapi disini kita biarin aja biar user tau dia ngeklik apa) */}
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-2 bg-gray-800 text-white text-[10px] px-3 py-1.5 rounded-full hover:bg-black transition-colors"
                >
                  {isDownloading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                  {isDownloading ? "Menyimpan..." : "Unduh Bukti"}
                </button>
              </div>
            ) : (
              // JIKA BELUM SETUJU -> TOMBOL KABUR
              <div className="w-full flex justify-end gap-3 z-10 pl-20">
                <motion.button
                  animate={{ x: position.x, y: position.y }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onHoverStart={moveButton} 
                  onTouchStart={moveButton} 
                  onClick={moveButton}      
                  className="bg-red-100 text-red-500 px-3 py-2 rounded text-xs font-bold border border-red-200 shadow-sm whitespace-nowrap"
                >
                  {getNoText()}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAgreed(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded text-xs font-bold shadow-md hover:bg-blue-700 flex items-center gap-1"
                >
                  <MousePointer2 size={12} />
                  SAYA SETUJU
                </motion.button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-2 border-t border-gray-200 text-center">
          <p className="text-[8px] text-gray-400 italic">
            *Dokumen ini sah secara hukum percintaan dan tidak dapat diganggu gugat.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contract;