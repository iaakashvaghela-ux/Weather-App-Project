import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Weather() {


  ///////////////useStates

  

  ////////////functions


const weather = async (city) => {
  const res = await axios.get(
    `https://api.weatherapi.com/v1/current.json`,
    {
      params: {
        key: "cd0637b69898437d948155023262901",
        
      }
    }
  );
  // console.log(res);
};


  ////////////////useEffects 
  useEffect(() => {
    weather();
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log(lat, lon);


      },
      (error) => {
        console.log("Location denied", error);
      }
    );

  }, [])

  
  // const date = new Date(`${current_weather.time}`)


  

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans text-slate-100 selection:bg-indigo-500/30">
      {/* Background Blobs for depth */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"></div>

      <div className="relative bg-slate-800/40 backdrop-blur-3xl rounded-[48px] shadow-2xl w-full max-w-6xl flex flex-col lg:flex-row overflow-hidden border border-slate-700/50">

        {/* Main Section */}
        <div className="flex-[2] p-8 lg:p-14 flex flex-col justify-between min-h-[700px]">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Multan</h2>
              <p className="text-slate-400 font-medium">{} </p>
            </div>
            <div className="bg-slate-700/30 p-3 rounded-2xl border border-slate-600/30 backdrop-blur-md hover:bg-slate-700/50 transition-colors cursor-pointer">
              <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          <div className="flex flex-col items-center py-12 group">
            <div className="relative">
              {/* Glow effect behind temperature */}
              <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full group-hover:bg-indigo-500/30 transition-all duration-700"></div>
              <div className="relative flex items-center gap-10">
                <span className="text-[200px] font-bold leading-none tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent drop-shadow-2xl">{20}°</span>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 bg-slate-700/20 p-4 rounded-3xl border border-white/5 backdrop-blur-sm hover:scale-105 transition-transform">
                    <div className="p-2 bg-indigo-500/20 rounded-xl">
                      <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a6 6 0 01-6-6c0-4 6-11 6-11s6 7 6 11a6 6 0 01-6 6z"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Humidity</p>
                      <p className="text-xl font-semibold tabular-nums">90 %</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-700/20 p-4 rounded-3xl border border-white/5 backdrop-blur-sm hover:scale-105 transition-transform">
                    <div className="p-2 bg-sky-500/20 rounded-xl">
                      <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Wind Speed</p>
                      <p className="text-xl font-semibold tabular-nums">{11} km/h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-7xl font-light text-slate-300 mt-4 tracking-tight">Cloudy</h3>
          </div>

          <div className="grid grid-cols-6 gap-4 pt-10">
            {/* Today */}
            <div className="group relative flex flex-col items-center p-6 rounded-[32px] bg-gradient-to-b from-indigo-600 to-indigo-700 shadow-xl shadow-indigo-900/40 border border-white/10 transform hover:-translate-y-2 transition-all duration-300">
              <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-4">Today</p>
              <p className="text-3xl font-bold mb-2">20°</p>
              <div className="w-8 h-1 bg-white/30 rounded-full mb-3"></div>
              <p className="text-xs text-indigo-100 font-medium">Mist</p>
            </div>
            {/* Tue */}
            <div className="group flex flex-col items-center p-6 rounded-[32px] bg-slate-700/20 border border-white/5 hover:bg-slate-700/40 transform hover:-translate-y-1 transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Tue</p>
              <p className="text-3xl font-semibold mb-2 text-slate-200">32°</p>
              <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">Sunny</p>
            </div>
            {/* Wed */}
            <div className="group flex flex-col items-center p-6 rounded-[32px] bg-slate-700/20 border border-white/5 hover:bg-slate-700/40 transform hover:-translate-y-1 transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Wed</p>
              <p className="text-3xl font-semibold mb-2 text-slate-200">12°</p>
              <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">Rainy</p>
            </div>
            {/* Thu */}
            <div className="group flex flex-col items-center p-6 rounded-[32px] bg-slate-700/20 border border-white/5 hover:bg-slate-700/40 transform hover:-translate-y-1 transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Thu</p>
              <p className="text-3xl font-semibold mb-2 text-slate-200">13°</p>
              <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">Rainy</p>
            </div>
            {/* Fri */}
            <div className="group flex flex-col items-center p-6 rounded-[32px] bg-slate-700/20 border border-white/5 hover:bg-slate-700/40 transform hover:-translate-y-1 transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Fri</p>
              <p className="text-3xl font-semibold mb-2 text-slate-200">22°</p>
              <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">Mist</p>
            </div>
            {/* Sat */}
            <div className="group flex flex-col items-center p-6 rounded-[32px] bg-slate-700/20 border border-white/5 hover:bg-slate-700/40 transform hover:-translate-y-1 transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Sat</p>
              <p className="text-3xl font-semibold mb-2 text-slate-200">22°</p>
              <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">Mist</p>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="flex-1 bg-white/5 backdrop-blur-2xl p-10 lg:p-14 flex flex-col gap-12 border-l border-white/5">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-light text-slate-400 uppercase tracking-[0.3em]">Good Morning</h2>
            <div className="relative inline-block">
              <p className="text-6xl font-black text-white tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">12:27 PM</p>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-[40px] border border-white/10 shadow-inner">
            <div className="flex items-center justify-between mb-6">
              <span className="text-6xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">20°</span>
              <div className="text-right space-y-1">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Feels Like</p>
                <p className="text-2xl font-semibold text-white">19°</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-emerald-400 font-medium bg-emerald-500/10 w-fit px-4 py-1 rounded-full border border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              Cloudy
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-center px-2">
              <h4 className="text-lg font-semibold text-slate-200">Hourly Forecast</h4>
              <button className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">See all</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* 1 PM */}
              <div className="bg-slate-700/30 rounded-3xl p-5 border border-white/5 hover:bg-slate-700/50 transition-all cursor-default group">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-2 group-hover:text-indigo-400">1 PM</p>
                <p className="text-2xl font-bold text-white mb-1">20°</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Cloudy</p>
              </div>
              {/* 2 PM */}
              <div className="bg-slate-700/30 rounded-3xl p-5 border border-white/5 hover:bg-slate-700/50 transition-all cursor-default group text-indigo-400 border-indigo-500/20">
                <p className="text-[10px] font-black uppercase tracking-tighter mb-2">2 PM</p>
                <p className="text-2xl font-bold text-white mb-1">21°</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Rainy</p>
              </div>
              {/* 3 PM */}
              <div className="bg-slate-700/30 rounded-3xl p-5 border border-white/5 hover:bg-slate-700/50 transition-all cursor-default group">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-2 group-hover:text-indigo-400">3 PM</p>
                <p className="text-2xl font-bold text-white mb-1">21°</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Rainy</p>
              </div>
              {/* 4 PM */}
              <div className="bg-slate-700/30 rounded-3xl p-5 border border-white/5 hover:bg-slate-700/50 transition-all cursor-default group">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-2 group-hover:text-indigo-400">4 PM</p>
                <p className="text-2xl font-bold text-white mb-1">20°</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Cloudy</p>
              </div>
              {/* 5 PM */}
              <div className="bg-slate-700/30 rounded-3xl p-5 border border-white/5 hover:bg-slate-700/50 transition-all cursor-default group">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-2 group-hover:text-indigo-400">5 PM</p>
                <p className="text-2xl font-bold text-white mb-1">21°</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Rainy</p>
              </div>
              {/* 6 PM */}
              <div className="bg-slate-700/30 rounded-3xl p-5 border border-white/5 hover:bg-slate-700/50 transition-all cursor-default group">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-2 group-hover:text-indigo-400">6 PM</p>
                <p className="text-2xl font-bold text-white mb-1">21°</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Rainy</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Weather
