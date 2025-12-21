import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSignature, Stamp, MousePointer2, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

const Contract = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Ref untuk area kertas yang akan difoto
  const cardRef = useRef<HTMLDivElement>(null);

  // LOGIC DOWNLOAD (BUG FIX: Tombol tidak ikut ke-foto)
  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null, // Transparan biar ikut background kertas
        scale: 2, // HD Quality
        // INI FIX-NYA: Elemen dengan class 'hide-on-print' akan diabaikan
        ignoreElements: (element) => element.classList.contains('hide-on-print'),
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "Surat-Perjanjian-Resmi-2026.png";
      link.click();
    } catch (error) {
      console.error("Gagal download:", error);
      alert("Gagal simpan gambar. Screenshot manual aja ya! 😅");
    }

    setIsDownloading(false);
  };

  // Logic Tombol Kabur (Makin lama makin susah)
  const moveButton = () => {
    const spread = Math.min(noCount * 20 + 100, 300); // Jarak kabur makin jauh
    const randomX = (Math.random() - 0.5) * spread;
    const randomY = (Math.random() - 0.5) * spread;
    setPosition({ x: randomX, y: randomY });
    setNoCount(prev => prev + 1);
  };

  const getNoText = () => {
    const texts = ["Gak Mau 😝", "Coba Lagi 🤪", "Tombol Rusak? 🤨", "Harus Mau! 😠", "Plis Dong 🥺", "Yakin Nolak? 🧐", "Klik Yg Biru Aja ❤️"];
    return texts[noCount % texts.length];
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 px-4 perspective-1000">
      
      {/* KERTAS PERJANJIAN */}
      <motion.div 
        ref={cardRef}
        initial={{ rotateX: 5, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#f4e4bc] text-gray-900 p-8 md:p-10 rounded-sm shadow-[0_5px_40px_rgba(0,0,0,0.5)] border-[1px] border-gray-400/50"
        style={{
            // Efek Kertas Bertekstur
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
            boxShadow: "inset 0 0 60px rgba(0,0,0,0.05), 0 20px 40px rgba(0,0,0,0.3)"
        }}
      >
        {/* Hiasan Sudut (Watermark Kuno) */}
        <div className="absolute top-4 right-4 opacity-30 pointer-events-none">
            <FileSignature size={60} className="text-gray-500" />
        </div>

        {/* HEADER */}
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-6 relative">
          <h1 className="font-serif font-bold text-2xl md:text-3xl tracking-widest uppercase text-gray-900 mb-1">
            SURAT PERJANJIAN
          </h1>
          <p className="font-mono text-[10px] text-gray-600 tracking-wider">
            NOMOR DOKUMEN: 2026/LOVE/MANDA-001
          </p>
        </div>

        {/* ISI SURAT */}
        <div className="font-serif text-sm md:text-base leading-relaxed space-y-4 text-gray-800 relative z-10">
          <p>
            Saya yang bertanda tangan di bawah ini <b>(Manda)</b>, dengan kesadaran penuh, waras, dan tanpa paksaan dari pihak manapun (kecuali dipaksa tombol ini), berjanji untuk:
          </p>
          
          <ol className="list-decimal pl-6 space-y-2 font-medium italic">
            <li>Mengurangi gengsi yang setinggi langit itu. 📉</li>
            <li>Selalu mengabari kalau mau menghilang lebih dari 2 jam. ⏳</li>
            <li>Tidak memendam masalah sendiri (cerita ke aku). 🗣️</li>
            <li>Mengakui kalau sebenarnya kangen tapi malu. 🫣</li>
            <li>Bahagia bareng di tahun 2026 dan seterusnya. ✨</li>
          </ol>
        </div>

        {/* AREA TANDA TANGAN */}
        <div className="mt-10 flex justify-between items-end relative h-32">
          
          {/* MATERAI (Desain Ulang Lebih Realistis) */}
          <div className="relative w-24 h-24 bg-blue-50 border-2 border-blue-200 flex flex-col items-center justify-center p-1 shadow-sm overflow-hidden group">
            <div className="absolute inset-0 border-[3px] border-dashed border-blue-300 opacity-50 m-1"></div>
            <div className="text-[6px] text-blue-400 font-bold tracking-tighter opacity-70 absolute top-1">REPUBLIK CINTA</div>
            <div className="font-serif font-bold text-blue-600 text-lg z-10">10000</div>
            <div className="text-[6px] text-blue-400 text-center leading-tight">SEPULUH RIBU<br/>RINDU</div>
            <div className="absolute bottom-1 text-[5px] text-blue-300">TGL: 01-01-2026</div>
            {/* Efek Hologram CSS */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          </div>

          {/* KOLOM TANDA TANGAN & TOMBOL */}
          <div className="flex-1 flex flex-col items-end justify-end relative z-20 pl-4">
            
            <p className="text-xs font-serif mb-8 text-center w-32 text-gray-600">
              Pihak Pertama,<br/>
              <span className="font-bold text-gray-900">( Manda )</span>
            </p>

            {/* AREA AKSI (TOMBOL / STEMPEL) */}
            <div className="absolute bottom-2 right-0 flex flex-col items-end gap-2">
                
                <AnimatePresence mode='wait'>
                    {isAgreed ? (
                        // JIKA SUDAH SETUJU: TAMPILKAN STEMPEL
                        <motion.div 
                            initial={{ scale: 3, opacity: 0, rotate: -45 }}
                            animate={{ scale: 1, opacity: 0.9, rotate: -15 }}
                            className="relative"
                        >
                            {/* Visual Stempel Cap Basah */}
                            <div className="border-4 border-red-700/80 text-red-700/80 rounded-lg px-4 py-2 font-serif font-bold text-xl uppercase tracking-widest bg-red-100/10 backdrop-blur-[1px] mask-image:url('https://www.transparenttextures.com/patterns/grunge-wall.png')">
                                <div className="flex items-center gap-2">
                                    <Stamp size={24} /> SAH / ACC
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        // JIKA BELUM SETUJU: TOMBOL INTERAKTIF
                        // Class 'hide-on-print' ditambahkan agar tombol ini HILANG saat difoto
                        <div className="flex items-center gap-2 hide-on-print">
                             {/* TOMBOL GAK MAU (KABUR) */}
                             <motion.button
                                animate={{ x: position.x, y: position.y }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                onHoverStart={moveButton} 
                                onTouchStart={moveButton} // Support HP
                                onClick={moveButton}      
                                className="bg-red-500 text-white px-3 py-1.5 rounded shadow-lg text-[10px] font-bold whitespace-nowrap z-50 hover:bg-red-600"
                            >
                                {getNoText()}
                            </motion.button>

                            {/* TOMBOL SETUJU */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsAgreed(true)}
                                className="bg-blue-900 text-white px-5 py-2 rounded shadow-xl text-xs font-bold flex items-center gap-1 hover:bg-blue-800 border border-blue-950"
                            >
                                <MousePointer2 size={14} />
                                TANDA TANGAN
                            </motion.button>
                        </div>
                    )}
                </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer Legal (Hanya Pemanis) */}
        <div className="mt-8 pt-4 border-t border-gray-400/30 text-center">
            <p className="text-[7px] text-gray-500 font-mono uppercase tracking-widest">
                Dokumen ini dibuat dengan perasaan tulus dan tidak dapat diganggu gugat.
            </p>
        </div>

      </motion.div>

      {/* TOMBOL DOWNLOAD (DITARUH LUAR KERTAS ATAU PAKAI CLASS HIDE-ON-PRINT) */}
      <AnimatePresence>
        {isAgreed && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mt-6"
            >
                <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 bg-gradient-to-r from-gray-800 to-black text-white px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform disabled:opacity-50 border border-gray-700"
                >
                    {isDownloading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Mencetak Dokumen...</span>
                        </>
                    ) : (
                        <>
                            <Download size={18} />
                            <span>Simpan Bukti Perjanjian 📸</span>
                        </>
                    )}
                </button>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Contract;