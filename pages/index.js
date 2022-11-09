import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, use } from 'react'
import Weather from '../components/Weather'
import persiandate from 'persian-date'

export default function Home() {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);

  const getweather = async() => {
    const res = await fetch('https://dataservice.accuweather.com/forecasts/v1/daily/5day/208837?apikey=nHnCDwZLAX2gH7tToPCePGiTSI4FMgs2&metric=true')
    const posts = await res.json();
    setData(posts.DailyForecasts);
    setLoading(false);
    console.log(posts.DailyForecasts)
  };

  useEffect(() => {
    if(Loading) {
      getweather();
    }
  }, [Loading]);

  if(Loading) return (
    <div className='flex justify-center items-center bg-blue-400 h-screen'>
      <h1 className='text-2xl sm:text-5xl text-center'>
      ...لطفا منتظر باشید
      </h1>
    </div>
  )

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center bg-blue-400'>
      <Head>
        <title>هواشناسی پارسیان</title>
        <meta name="description" content="هواشناسی شهرستان پارسیان" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className='text-xl sm:text-2xl lg:text-5xl tracking-wide text-black font-bold  mt-5'>
          هواشناسی پارسیان
        </h1>
      </div>

      <div className='flex flex-wrap justify-center items-center sm:gap-5 mb-7 sm:mb-5'>
      {Data.map((info, index) => {
        return (
          <Weather key={index} IconDay={info.Day.Icon} IconNight={info.Night.Icon} Date={String(new persiandate(info.EpochDate * 1000).format()).substring(0,11)} Day={new persiandate(info.EpochDate * 1000).format('dddd')} MinDay={info.Temperature.Minimum.Value} MaxDay={info.Temperature.Maximum.Value} 
           RainDay={info.Day.HasPrecipitation} RainNight={info.Night.HasPrecipitation}
          />
        )
      })}
      </div>

     
    </div>
  )
}

