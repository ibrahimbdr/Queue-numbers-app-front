import React from 'react'
import { useNavigate } from 'react-router-dom';

const Waiting = () => {
    const navigate = useNavigate();
    const [showRedirect, setRedirect] = React.useState(false)
    setTimeout(() => {
        setRedirect(true)
        setTimeout(() => {
            navigate('/');
        }, 3000)
    }, 7000)
  return (
    <div className='flex-col justify-center items-center'>
        {!showRedirect&&<div className='fixed bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2'><h1 className='flex text-base sm:text-2xl lg:text-4xl animate-typeWriter overflow-hidden border-r-8 border-gray-500 whitespace-nowrap my-0 mx-auto tracking-widest'>Please take a seat, you will be soon attended ...</h1></div>}
        {showRedirect&&<h1 className='w-fit text-center mt-10 text-sm sm:text-lg p-1 overflow-hidden border-r-8 border-gray-500 whitespace-nowrap my-0 mx-auto tracking-widest'>Redirecting to Home ...</h1>}
    </div>
  )
}

export default Waiting