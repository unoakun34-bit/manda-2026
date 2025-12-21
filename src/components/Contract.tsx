import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSignature, Download, Loader2, Crown, Stamp, ShieldCheck } from 'lucide-react';
import html2canvas from 'html2canvas';

const Contract = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // State posisi tombol (Awalnya relative, pas kabur jadi absolute)
  const [btnStyle, setBtnStyle] = useState<any>({});
  const [hasMoved, setHasMoved] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  // --- LOGIC DOWNLOAD ---
  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null, 
        scale: 2, 
        ignoreElements: (element) => element.classList.contains('hide-on-print'),
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "Golden-Contract-Manda-2026.png";
      link.click();
    } catch (error) {
      console.error("Gagal download:", error);
      alert("Gagal simpan gambar. Screenshot manual aja ya! 😅");
    }
    setIsDownloading(false);
  };

  // --- LOGIC TOMBOL KABUR (DI DALAM KOTAK) ---
  const moveButton = () => {
    setHasMoved(true);
    
    // Batas aman (0% - 70%) biar gak nabrak pinggir container
    const randomTop = Math.floor(Math.random() * 70) + '%';
    const randomLeft = Math.floor(Math.random() * 60) + '%';
    
    setBtnStyle({ 
        position: 'absolute',
        top: randomTop, 
        left: randomLeft,
        zIndex: 50
    });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 px-4 perspective-1000">
      
      {/* KERTAS GOLDEN VVIP */}
      <motion.div 
        ref={cardRef}
        initial={{ rotateX: 5, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-xl shadow-[0_0_50px_rgba(234,179,8,0.4)] overflow-hidden border-4 border-yellow-600/50"
        style={{
            // GRADASI EMAS MEWAH
            background: `linear-gradient(135deg, #FBF5B7 0%, #BF953F 25%, #FCF6BA 50%, #B38728 75%, #FBF5B7 100%)`,
        }}
      >
        {/* Shine Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-black/10 pointer-events-none"></div>

        {/* Noise Texture Halus */}
        <div 
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* KONTEN SURAT */}
        <div className="p-6 relative z-10">
            
            {/* HEADER */}
            <div className="text-center mb-6 border-b-2 border-yellow-900/20 pb-4">
                <div className="flex justify-center text-yellow-800 mb-2 drop-shadow-sm">
                    <Crown size={36} strokeWidth={1.5} fill="#FDE68A" />
                </div>
                <h1 className="font-serif font-bold text-2xl md:text-3xl tracking-[0.15em] text-[#3E2723] uppercase drop-shadow-sm">
                    Golden Agreement
                </h1>
                <div className="flex items-center justify-center gap-2 mt-1 opacity-70">
                    <div className="h-[1px] w-8 bg-[#3E2723]"></div>
                    <p className="font-sans text-[8px] text-[#3E2723] font-bold tracking-[0.2em] uppercase">
                        VVIP EXCLUSIVE ACCESS
                    </p>
                    <div className="h-[1px] w-8 bg-[#3E2723]"></div>
                </div>
            </div>

            {/* ISI SURAT */}
            <div className="font-serif text-sm leading-relaxed text-[#2c1810] font-semibold">
                <p className="mb-4 text-justify indent-6">
                    Pemegang tiket ini, <b>Amanda</b>, dengan status VVIP dan kesadaran penuh, menyepakati kontrak eksklusif bersama <b>Azriel</b> untuk:
                </p>
                
                <ul className="space-y-2 pl-2 text-xs md:text-sm">
                    <li className="flex gap-2 items-center bg-white/20 p-2 rounded-lg border border-yellow-600/20 shadow-sm">
                        <ShieldCheck size={16} className="text-yellow-900" /> 
                        <span>Menurunkan gengsi ke level minimum.</span>
                    </li>
                    <li className="flex gap-2 items-center bg-white/20 p-2 rounded-lg border border-yellow-600/20 shadow-sm">
                        <ShieldCheck size={16} className="text-yellow-900" /> 
                        <span>Fast response (kecuali ketiduran).</span>
                    </li>
                    <li className="flex gap-2 items-center bg-white/20 p-2 rounded-lg border border-yellow-600/20 shadow-sm">
                        <ShieldCheck size={16} className="text-yellow-900" /> 
                        <span>Tetap asik walau "Stranger" di sekolah.</span>
                    </li>
                    <li className="flex gap-2 items-center bg-white/20 p-2 rounded-lg border border-yellow-600/20 shadow-sm">
                        <ShieldCheck size={16} className="text-yellow-900" /> 
                        <span>Mengakui kenyamanan dalam obrolan.</span>
                    </li>
                </ul>
            </div>

            {/* FOOTER AREA (TTD & MATERAI) */}
            <div className="mt-8 flex justify-between items-end h-36 relative">
                
                {/* MATERAI 10000 (Dibuat Sangat Jelas) */}
                <div className="relative w-20 h-24 bg-blue-100 border border-blue-400 shadow-md flex flex-col items-center justify-center overflow-hidden shrink-0">
                    <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle,white,transparent)]"></div>
                    <span className="text-[6px] text-blue-900 font-bold tracking-widest z-10">INDONESIA</span>
                    <span className="text-red-500 font-bold text-xl z-10 my-1">10000</span>
                    <span className="text-[5px] text-blue-900 text-center leading-tight z-10">SEPULUH RIBU<br/>RUPIAH</span>
                    <span className="text-[4px] text-gray-400 absolute bottom-1 right-1 z-10">TGL: 2026</span>
                </div>

                {/* KOLOM TANDA TANGAN */}
                <div className="flex-1 flex flex-col items-end relative h-full justify-end">
                    <p className="text-[9px] font-serif text-[#3E2723] uppercase tracking-wider mb-2 mr-2 font-bold">
                        Tertanda, Manda
                    </p>

                    {/* CONTAINER TOMBOL (Area Gerak Tombol Kabur) */}
                    <div className="relative w-48 h-20 bg-black/5 rounded-lg border border-black/10 overflow-hidden flex items-center justify-center">
                        
                        <AnimatePresence mode='wait'>
                            {isAgreed ? (
                                // STEMPEL GOLDEN
                                <motion.div 
                                    initial={{ scale: 3, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex flex-col items-center justify-center"
                                >
                                    <div className="border-[3px] border-red-800 text-red-800 px-4 py-1 rounded font-black font-serif uppercase tracking-[0.2em] -rotate-12 bg-red-100/50 backdrop-blur-sm shadow-lg">
                                        <div className="flex items-center gap-2 text-xs border-b border-red-800/50 pb-1 mb-1 justify-center">
                                            <Stamp size={14} /> OFFICIAL
                                        </div>
                                        ACCEPTED
                                    </div>
                                </motion.div>
                            ) : (
                                // TOMBOL INTERAKTIF
                                // Class hide-on-print wajib ada
                                <div className="w-full h-full relative hide-on-print">
                                    
                                    {/* TOMBOL GAK MAU (Kabur dalam kotak ini aja) */}
                                    <motion.button
                                        style={hasMoved ? btnStyle : {}} 
                                        animate={hasMoved ? { x: 0, y: 0 } : {}}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                        
                                        onHoverStart={moveButton} 
                                        onTouchStart={moveButton}
                                        onClick={moveButton}
                                        
                                        className={`bg-gray-200 text-gray-700 px-3 py-1.5 rounded shadow-sm text-[10px] font-bold whitespace-nowrap hover:bg-gray-300 transition-colors z-20 ${!hasMoved ? 'absolute top-1/2 left-2 -translate-y-1/2' : ''}`}
                                    >
                                        Gak Mau 😝
                                    </motion.button>

                                    {/* TOMBOL UTAMA */}
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsAgreed(true)}
                                        className="absolute top-1/2 right-2 -translate-y-1/2 bg-gradient-to-r from-gray-900 to-black text-yellow-400 px-4 py-2 rounded shadow-lg text-xs font-bold flex items-center gap-2 border border-yellow-600 z-10"
                                    >
                                        <FileSignature size={14} />
                                        Deal 🤝
                                    </motion.button>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* ID BARCODE (Pemanis) */}
            <div className="mt-4 pt-2 border-t border-yellow-900/20 flex justify-between items-end opacity-60">
                <div className="h-6 w-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png')] bg-contain bg-no-repeat opacity-50 grayscale"></div>
                <p className="text-[6px] font-mono text-[#3E2723]">SECURE DOC • ENCRYPTED</p>
            </div>
        </div>
      </motion.div>

      {/* TOMBOL DOWNLOAD */}
      <AnimatePresence>
        {isAgreed && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mt-6"
            >
                <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-800 text-white px-6 py-3 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:scale-105 transition-transform disabled:opacity-50 border border-yellow-400 font-bold tracking-wide"
                >
                    {isDownloading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            <span className="text-xs">MENCETAK...</span>
                        </>
                    ) : (
                        <>
                            <Download size={16} />
                            <span className="text-xs">SIMPAN TIKET EMAS 📸</span>
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