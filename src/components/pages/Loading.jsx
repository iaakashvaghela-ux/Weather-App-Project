import React from 'react'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all duration-300">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-24 h-24 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-cyan-500 border-l-transparent animate-spin-slow opacity-80 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>

        {/* Inner Ring - Counter Rotating */}
        <div className="absolute w-16 h-16 rounded-full border-4 border-t-transparent border-r-purple-500 border-b-transparent border-l-pink-500 animate-[spin_1s_linear_infinite_reverse] opacity-90 shadow-[0_0_15px_rgba(168,85,247,0.4)]"></div>

        {/* Center Glow */}
        <div className="absolute w-4 h-4 rounded-full bg-white animate-pulse-fast shadow-[0_0_15px_#fff]"></div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <h2 className="text-xl font-medium tracking-widest text-white/90 uppercase animate-float">
          Loading Data
        </h2>
        <div className="flex gap-1.5 items-center">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-[pulse_1s_ease-in-out_infinite]"></span>
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-[pulse_1s_ease-in-out_infinite_0.2s]"></span>
          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-[pulse_1s_ease-in-out_infinite_0.4s]"></span>
        </div>
      </div>

      {/* Background Decorative Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 blur-[100px] opacity-20 pointer-events-none">
        <div className="w-[400px] h-[400px] bg-blue-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}
