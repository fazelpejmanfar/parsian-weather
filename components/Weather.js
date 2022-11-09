import React from 'react'
import Image from 'next/image'

function Weather({IconDay, IconNight, Date, Day, MinDay, MaxDay, RainDay, RainNight }) {
  return (
    <div className='w-[200px] min-h-[250px] bg-blue-100 p-3 rounded-md flex flex-col justify-start items-center mt-5'>
    <div className='flex flex-col justify-center items-center'>
    <p>
       {Day} 
    </p>

    <p>
       {Date} 
    </p>
    </div>


    <div className='flex flex-col justify-cecnter items-center gap-2 mb-5 mt-5'>
    <div className='flex justify-center items-center'>
        <Image src={`/icons/${IconDay}-s.png`} width={75} height={45} alt='weather'/>
        <Image src={`/icons/${IconNight}-s.png`} width={75} height={45} alt='weather'/>
    </div>

    <div className='flex justify-center items-center gap-5'>
    <div className='flex flex-col justify-center items-center'>
    <p>
       کمترین 
    </p>

    <p className='text-blue-500'>
       {MinDay} 
    </p>
    </div>

    <div className='flex flex-col justify-center items-center'>
       بیشترین 
    <p>
    </p>

    <p className='text-red-500'>
       {MaxDay} 
    </p>
    </div>
    </div>
    <div className='flex flex-col justify-center items-center'>
    <p>
       احتمال بارش روز؟
    </p>

    <p>
    {RainDay ? "دارد" : "ندارد"} 
    </p>
    </div>

    <div className='flex flex-col justify-center items-center'>
    <p>
       احتمال بارش شب؟
    </p>

    <p>
       {RainNight ? "دارد" : "ندارد"} 
    </p>
    </div>
    </div>


   



    </div>
  )
}

export default Weather