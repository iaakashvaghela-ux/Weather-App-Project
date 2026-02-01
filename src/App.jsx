import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { weather_code_data } from './components/pages/weather_code_data';
import Loading from './components/pages/Loading';


function App() {


  ///////////////useStates
  const [dates, setDates] = useState(``)
  const [time, setTime] = useState([0, 0])
  const [isLoading, setIsLoading] = useState(true)
  const [isTimeSame, setisTimeSame] = useState(``)

  const [open, setOpen] = useState(false);
  const [current_weather, setweatherData] = useState({})
  const [allWeatherData, setallWeatherData] = useState({})
  const [latitude, setlatitude] = useState(28.6139)
  const [longitude, setlongitude] = useState(77.2090)
  const [citiesName, setcitiesName] = useState([])
  const [searchInp, setsearchInp] = useState('')
  const [filterdCitiesName, setfilterdCitiesName] = useState("delhi")
  const [weatherCode, setweatherCode] = useState()
  const [humadity, sethumadity] = useState([])
  const [dayForCast, setdayForCast] = useState({})
  const [weekendForecast, setWeekendForecast] = useState([]);


  let weatherType = weather_code_data[weatherCode]?.day?.description

  // console.log(weatherType);
  ///////////////loops

  const search = searchInp.toLowerCase();

  const isMatch = citiesName.filter(v =>
    v.city.toLowerCase().includes(search)
  );

  // console.log(isMatch); // true / false


  ////////////functions
  let weather = async () => {
    setIsLoading(true)
    let apiData = await axios.get(`https://api.open-meteo.com/v1/forecast?`,
      {
        params: {
          latitude: latitude,
          longitude: longitude,
          current_weather: true,
          hourly: "weather_code,relative_humidity_2m,temperature_2m",
          daily: "weather_code,temperature_2m_max,temperature_2m_min",
          timezone: "auto",
        },
      });
    let { data } = await apiData
    setallWeatherData(data)
    let { current_weather } = await data
    setweatherData(current_weather);
    setweatherCode(current_weather.weathercode);
    setIsLoading(false);
    setsearchInp('');
    sethumadity(data.hourly.relative_humidity_2m);


  }




  let nameToWeatherSearch = async () => {
    let apiData = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?`,
      {
        params: {
          name: filterdCitiesName,
          count: 1,
          language: `en`,
        },
      }
    )

    setlatitude(apiData.data.results[0].latitude == undefined ? 28.6139 : apiData.data.results[0].latitude);
    setlongitude(apiData.data.results[0].longitude == undefined ? 77.2090 : apiData.data.results[0].longitude);
  }


  let cities = async () => {
    let apiData = await axios.get(`https://countriesnow.space/api/v0.1/countries/population/cities`)
    setcitiesName(apiData.data.data);
  }

  function date() {
    const now = new Date();

    const year = now.getFullYear();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");


    setDates(`${day}/${month}/${year}`);
    setTime([hours, minutes]);
  }

  const weeklyForCast = () => {
    const daily = allWeatherData?.daily;
    if (!daily?.time) return [];

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return daily.time.map((date, index) => {
      const day = new Date(date).getDay();

      return {
        date,
        dayName: index === 0 ? "Today" : dayNames[day],
        isToday: index === 0,
        maxTemp: daily.temperature_2m_max[index],
        minTemp: daily.temperature_2m_min[index],
        weatherCode: daily.weather_code[index],
      };
    });
  };


  const todayHourlyForecast = () => {
    const hourly = allWeatherData?.hourly;
    if (!hourly?.time) return [];

    return hourly.time
      .slice(0, 24)
      .map((time, index) => {
        const hour = new Date(time).getHours();

        return {
          time,
          hourLabel: index === 0 ? `0${hour}:00` : `${hour}:00`,
          isNow: index === 0,
          temperature: hourly.temperature_2m[index],
          humidity: hourly.relative_humidity_2m[index],
          weatherCode: hourly.weather_code[index],
          isSame: `${hour}`,
        };
      });
  };



  ////////////////useEffects 

  useEffect(() => {
    let result = todayHourlyForecast()
    setdayForCast(result)
    // console.log(result);
  }, [allWeatherData])



  useEffect(() => {
    const result = weeklyForCast();
    setWeekendForecast(result);
  }, [allWeatherData]);


  useEffect(() => {
    const interval = setInterval(() => {
      date();
    }, 700);

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    weather();
  }, [latitude, longitude])

  useEffect(() => {
    cities()
    nameToWeatherSearch()
  }, [filterdCitiesName])


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // console.log(lat, lon);
        setlatitude(lat);
        setlongitude(lon);
        setfilterdCitiesName(`your location`)
      },
      (error) => {
        console.log("Location denied", error);
      }
    );

  }, [])


  let ampm = time[0] > 12 ? "pm" : "am"
  let hours = time[0] < 1 ? "12" : time[0] > 12 ? time[0] - 12 : time[0]
  let minutes = time[1]

  let rawHours = parseInt(time[0]);

  if (rawHours >= 5 && rawHours < 12) {
    rawHours = "Good Morning"
  } else if (rawHours >= 12 && rawHours < 18) {
    rawHours = "Good Afternoon"
  } else if (rawHours >= 18 && rawHours < 22) {
    rawHours = "Good Evening"
  } else {
    rawHours = "Good Night"
  }





  const currentHourIndex = new Date().getHours();
  const liveHumidity = humadity?.[currentHourIndex];



  useEffect(() => {
    let hourss = new Date().getHours()
    setisTimeSame(`${hourss}`);
  }, [])




  if (isLoading) return <Loading />

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans text-slate-100 selection:bg-indigo-500/30">
      {/* Background Blobs for depth */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"></div>

      <div className="relative bg-slate-800/40 backdrop-blur-3xl rounded-3xl lg:rounded-[48px] shadow-xl lg:shadow-2xl w-full max-w-6xl flex flex-col lg:flex-row overflow-hidden border border-slate-700/50">

        {/* Main Section */}
        <div className="flex-[2] p-6 md:p-10 lg:p-14 flex flex-col justify-between min-h-fit lg:min-h-[700px]">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{filterdCitiesName.toUpperCase()}</h2>
              <p className="text-slate-400 font-medium">{dates} </p>
            </div>
            <div className="flex items-center relative gap-2">
              {/* Search Input */}
              <input
                onChange={(e) => setsearchInp(e.target.value)}
                value={searchInp}
                type="text"
                placeholder="Search..."
                className={`absolute right-15 bg-slate-700/30 text-slate-200 placeholder-slate-400 
                 px-4 py-2 rounded-2xl border border-slate-600/30 backdrop-blur-md
                 transition-all duration-300 ease-in-out
                 ${open ? "w-56 opacity-100" : "w-0 opacity-0 px-0 border-0"}`}
              />

              {/* Search Icon */}
              <div
                onClick={() => setOpen(!open)}
                className="bg-slate-700/30 p-3 rounded-2xl border border-slate-600/30 
                backdrop-blur-md hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                <svg
                  className="w-6 h-6 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>


              <div className={`p-2 absolute right-0 top-14 z-[9999] overflow-x-hidden overflow-y-scroll duration-300 ${open ? "opacity-100 h-[300px] md:h-[500px] lg:h-[700px]" : "h-0 opacity-0 px-0 border-0"}`}>
                {
                  isMatch.map((v, idx) => {

                    return (
                      <p onClick={() => {
                        setfilterdCitiesName(v.city.toLowerCase());
                        setOpen(!open);
                      }}
                        key={idx} className={`p-3 cursor-pointer w-[200px] bg-gradient-to-r from-blue-500/40 to-purple-600/30 text-white  ${open ? "w-56 opacity-100" : "w-0 opacity-0 px-0 border-0"}`}> {v.city}</p>
                    )

                  })
                }




              </div>
            </div>
          </div>

          <div className="flex flex-col items-center py-12 group">
            <div className="relative">
              {/* Glow effect behind temperature */}
              <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full group-hover:bg-indigo-500/30 transition-all duration-700"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <span className="text-9xl md:text-[150px] lg:text-[200px] font-bold leading-none tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent drop-shadow-2xl">{Math.floor(current_weather.temperature)}°</span>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 bg-slate-700/20 p-4 rounded-3xl border border-white/5 backdrop-blur-sm hover:scale-105 transition-transform">
                    <div className="p-2 bg-indigo-500/20 rounded-xl">
                      <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a6 6 0 01-6-6c0-4 6-11 6-11s6 7 6 11a6 6 0 01-6 6z"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Humidity</p>
                      <p className="text-xl font-semibold tabular-nums">{liveHumidity} %</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-700/20 p-4 rounded-3xl border border-white/5 backdrop-blur-sm hover:scale-105 transition-transform">
                    <div className="p-2 bg-sky-500/20 rounded-xl">
                      <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Wind Speed</p>
                      <p className="text-xl font-semibold tabular-nums">{current_weather.windspeed} km/h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {weatherType} */}
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-light text-slate-300 mt-4 tracking-tight">{weatherType}</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-10">




            {weekendForecast.map((day, idx) => (<>

              <div key={day.date} className={`${day.dayName == `Today` ? `border-2 border-red-700` : ` border-white/10`}  group relative flex flex-col items-center p-6 rounded-[32px] bg-gradient-to-b from-indigo-600 to-indigo-700 shadow-xl shadow-indigo-900/40 border transform hover:-translate-y-2 transition-all duration-300`}>
                <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-4">{day.dayName}</p>
                <p className="text-xs font-bold text-indigo-200   ">max</p>
                <p className="text-3xl font-bold mb-2">{Math.floor(day.maxTemp)}°</p>
                <div className="w-8 h-1 bg-white/30 rounded-full mb-3"></div>
                <p className="text-xs text-indigo-100 font-medium text-center leading-tight">{`${weather_code_data[day.weatherCode]?.day?.description}`}</p>
              </div>
            </>
            ))}

          </div>
        </div>

        {/* Sidebar Section */}
        <div className="flex-1 bg-white/5 backdrop-blur-2xl p-6 md:p-10 lg:p-14 flex flex-col gap-8 md:gap-12 border-t lg:border-l lg:border-t-0 border-white/5">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-light text-slate-400 uppercase tracking-[0.3em]">{rawHours}</h2>
            <div className="relative inline-block">
              <p className="text-4xl md:text-5xl lg:text-6xl font-black text-white tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{hours}:{minutes} {ampm}</p>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-[40px] border border-white/10 shadow-inner">
            <div className="flex items-center justify-between mb-6">
              <span className="text-6xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">{Math.floor(current_weather.temperature)}°</span>

            </div>
            <div className="flex items-center gap-3 text-emerald-400 font-medium bg-emerald-500/10 w-fit px-4 py-1 rounded-full border border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              {weatherType}
            </div>
          </div>

          <div className="space-y-8 ">
            <div className="flex justify-between items-center px-2">
              <h4 className="text-lg font-semibold text-slate-200">Hourly Forecast</h4>
              <button className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">See all</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 h-[248px] overflow-y-scroll">
              {
                dayForCast.map((hour, i) => {
                  return (
                    <div key={i} className={`${isTimeSame == hour.isSame ? "bg-[#4E38F4]" : "bg-slate-700/30"}   rounded-3xl p-5 border border-white/5 hover:bg-slate-700/50 transition-all cursor-default group`}>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-2 group-hover:text-indigo-400">{isTimeSame == hour.isSame ? "Now" : hour.hourLabel}</p>
                      <p className="text-2xl font-bold text-white mb-1">{hour.temperature}°</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">{`${weather_code_data[hour.weatherCode]?.day?.description}`}</p>
                    </div>
                  )
                })

              }



            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App
