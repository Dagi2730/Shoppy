import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import SparkLine from '../components/Charts/SparkLine';
import { SparklineAreaData } from '../data/dummy';
import Stacked from '../components/Charts/Stacked';


import { Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import welcomeImage from '../data/welcome-bg.svg';
import { earningData } from '../data/dummy';

const Ecommerce = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="mt-6 m-4 overflow-x-auto">
      <div className="flex flex-col lg:flex-row items-start gap-4 flex-wrap">
        <div
          className="relative w-full lg:w-auto rounded-xl shadow-md overflow-hidden"
          style={{
            backgroundImage: `url(${welcomeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl" />
          <div className="relative p-6 text-white flex justify-between items-start">
            <div className="flex flex-col">
              <div>
                <p className="font-bold text-gray-200">Earnings</p>
                <p className="text-2xl font-semibold">$63,448.78</p>
              </div>
              <div className="mt-4">
                <Button
                  text="Download"
                  color="white"
                  bgColor={currentColor}
                  borderRadius="10px"
                  size="md"
                />
              </div>
            </div>

            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl text-white hover:drop-shadow-xl rounded-full p-3 ml-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg w-44 p-4 pt-6 rounded-2xl shadow-md"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-90 rounded-full p-3 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-2">
                <span className="text-base font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex gap-10 flex-wrap justify-center'>
        <div className=' bg-white dark:bg-secondary-dark-bg dark:text-gray-100 m-3 p-4 rounded-2xl md:w-780'>
          <div className='flex justify-between items-center'>
            <p className='text-xl font-semibold'>
              Revenue Updates
            </p>
            <div className='flex items-center gap-4'>
              <p className='flex items-center gap-2 text-gray-600 hover:drop-shadow-xl'>
                <span>
                  <GoDotFill/>
                </span>
                <span>Expense</span>
              </p>
              <p className='flex items-center gap-2 text-green-400 hover:drop-shadow-xl'>
                <span>
                  <GoDotFill/>
                </span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className='mt-10 flex gap-10 flex-wrap justify-center'>
            <div className='border-r-1 border-color m-4 pr-10'>
          <div>
            <p>
              <span className='text-3xl font-semibold'>$93,438</span>
              <span className='p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs'>23%</span>
            </p>
            <p className='text-gray-500 mt-1'>Budget</p>
          </div>
          <div className='mt-8'>
            <p>
              <span className='text-3xl font-semibold'>$48,438</span></p>
            <p className='text-gray-500 mt-1'>Expense</p>
          </div>

          <div className='mt-5'>
            <SparkLine 
              currentColor={currentColor}
              id="line-sparkline"
              type="Line"
              height="80px"
              width="250px"
              data={SparklineAreaData}
              color={currentColor}
          />

          </div>
          <div className='mt-10'>
            <Button 
              color='white'
              bgColor={currentColor}
              text='Download Report'
              borderRadius='10px'
              size='md'
            />
          </div>
          </div>
          <div>
            <Stacked width="320px" height="360px" />
          </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Ecommerce;
