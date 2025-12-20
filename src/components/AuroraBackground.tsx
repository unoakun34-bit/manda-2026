const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden bg-[#050505]">
      {/* 1. Warna Dasar (Ungu Gelap Malam) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f0c29] to-[#000000] opacity-90" />

      {/* 2. Blob Warna (Nebula Effect) - Opacity dinaikkan sedikit biar kelihatan */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob" />
      
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-900 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000" />
      
      <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-900 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-blob animation-delay-4000" />

      {/* 3. Aksen Emas Halus */}
      <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[300px] h-[300px] bg-manda-gold rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse-slow" />
      
      {/* 4. Vignette (Pinggiran Gelap) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
    </div>
  );
};

export default AuroraBackground;