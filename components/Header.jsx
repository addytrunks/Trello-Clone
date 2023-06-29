'use client'

import Image from 'next/image'
import {MagnifyingGlassIcon,UserCircleIcon} from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/boardStore'

const Header = () => {

    const [board,searchString,setSearchString] = useBoardStore((state) => [state.board,state.searchString,state.setSearchString])

  return (
    <header>
        <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl'>

            <div className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-500 to-[#0055D1] blur-3xl filter -z-50 opacity-50'/>
            <div>
                <Image src="https://links.papareact.com//c2cdd5" alt='Trello Logo' width={300} height={100} className='object-contain w-44 md:w-56 pb-10 md:pb-0'/>
            </div>

            <div className='flex items-center space-x-4 flex-1 md:justify-end w-full'>
                <form className='flex items-center space-x-5 bg-white rounded-md shadow-md p-2 flex-1 md:flex-initial'>
                    <MagnifyingGlassIcon className='h-6 w-6 text-gray-400'/>
                    <input type="text" placeholder='Search' className='w-full outline-none p-1' value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                    <button type='submit' hidden>Search</button>
                </form>

                <Avatar name='Adhithya Srivatsan' round color="#0055D1" size='50'/>
            </div>
        </div>

        <div className='flex items-center justify-center px-5 md:py-5'>
            <p className='flex items-center text-sm font-normal pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1] md:p-4 p-3 mb-4'>
                <UserCircleIcon className={`inline-block h-10 w-10 text-[#0055D1] mr-1`}/>
                Welcome to the Trello Clone!Feel free to play around!
            </p>
        </div>
    </header>
  )
}

export default Header