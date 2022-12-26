import Head from 'next/head'
import Image from 'next/image'
import Weather from '../components/Weather'
import persiandate from 'persian-date'
import useSWR from "swr";
import { InfinitySpin } from 'react-loader-spinner'

export default function Home() {
  const TODAY = new persiandate();

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    'https://dataservice.accuweather.com/forecasts/v1/daily/5day/208837?apikey=nHnCDwZLAX2gH7tToPCePGiTSI4FMgs2&metric=true',
    fetcher
  );


console.log(TODAY)
  if(!data) return (
    <div className='flex flex-col space-x-5 justify-center items-center bg-blue-400 h-screen'>
      <h1 className='text-2xl sm:text-5xl text-center'>
      ...لطفا منتظر باشید
      </h1>
      <InfinitySpin 
  width='200'
  color="black"
/>
    </div>
  )

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center bg-blue-400'>
      <Head>
        <title>هواشناسی پارسیان</title>
        <meta name="description" content="هواشناسی شهرستان پارسیان" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col justify-center items-center space-y-4'>
        <h1 className='text-xl sm:text-2xl lg:text-5xl tracking-wide text-black font-bold  mt-5'>
          هواشناسی پارسیان
        </h1>
        <h4 className='text-md sm:text-xl lg:text-2xl tracking-wide text-gray-800 font-bold text-center'>
         {new persiandate(data.DailyForecasts[0].EpochDate * 1000).format('dddd')}<br></br>
         {String(new persiandate(data.DailyForecasts[0].EpochDate * 1000).format()).substring(0,11)}
        </h4>
      </div>

      <div className='flex flex-wrap justify-center items-center sm:gap-5 mb-7 sm:mb-5'>
      {data.DailyForecasts.map((info, index) => {
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

