import Image from 'next/image'
import Player from '@/components/Player/player'
import localFont from 'next/font/local'

const ClashDisplay = localFont({ src: [
  {
    path: '../assets/fonts/ClashDisplay-ExtraLight.ttf',
    weight: '200',
  },
  {
    path: '../assets/fonts/ClashDisplay-Light.ttf',
    weight: '300',
  },
  {
    path: '../assets/fonts/ClashDisplay-Regular.ttf',
    weight: '400',
  },
  {
    path: '../assets/fonts/ClashDisplay-Medium.ttf',
    weight: '500',
  },
  {
    path: '../assets/fonts/ClashDisplay-SemiBold.ttf',
    weight: '600',
  },
  {
    path: '../assets/fonts/ClashDisplay-Bold.ttf',
    weight: '700',
  },
  
],})

export default function Main() {
  return (
    <div>
      <div className='w-screen mt-[10vh] lg:mt-0 lg:h-screen flex justify-center'>
        <div className='flex text-center lg:text-left flex-col lg:flex-row justify-center items-center gap-40 xl:gap-52 '>
          <div className='flex flex-col gap-y-10 sm:gap-y-5 w-4/5 lg:w-[40%] items-center lg:items-start md:items-right'>
            <div className={`${ClashDisplay.className} text-4xl sm:text-6xl font-semibold`}>
              <h1>Code &</h1>
              <h1>Groove With</h1>
              <h1 className='gradient-codetune'>CodeTune</h1>
            </div>
            <p className={`${ClashDisplay.className} text-base sm:text-lg xl:text-xl`}>With CodeTune, coders can listen to music while they code,helping to boost their creativity, productivity and focus, The music is carefully curated to enhance the coding experience,  ensuring that it does not interfere with the flow of coding.</p>
            <div className={`${ClashDisplay.className} font-medium flex-row flex-wrap justify-center sm:justify-start flex text-lg xl:text-2xl gap-x-14 xl:gap-x-16 gap-y-5 sm:gap-y-48`}>
              <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl xl:text-4xl'>+ 9</h1>
                <h2 className=''>Stations</h2>
              </div>
              <div className='flex flex-col justify-center items-center'>
                  <h1 className='text-3xl xl:text-4xl'>+31 h</h1>
                  <h2 className=''>Of Song</h2>
              </div>
              <div className='flex flex-col justify-center items-center'>
                  <h1 className='text-3xl xl:text-4xl'>∞</h1>
                  <h2 className=''>Listening</h2>
              </div>
            </div>
          </div>
          <div className={`${ClashDisplay.className} font-semibold -mt-36`}>
            <Player />
          </div>
        </div>
      </div>
      <div>
        <h1 className={`${ClashDisplay.className} font-semibold text-center gradient-codetune-center`}>Change Stations</h1>
      </div>
    </div>
  )
}
