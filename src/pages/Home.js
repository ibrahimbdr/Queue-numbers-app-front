import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    const [showWelcome, setShowWeolcome] = React.useState(true)
    const [showMsg, setShowMsg] = React.useState(false)
    const [showBtns, setShowBtns] = React.useState(false)
    setTimeout(()=>{
        setShowWeolcome(false);
        setShowMsg(true);
        setTimeout(()=>{
            setShowBtns(true)
        },3000)
        
    },3500)
  return (
    <div className='flex-col justify-center items-center'>
        {showWelcome&&<div className='fixed bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2'><h1 className='flex text-3xl sm:text-5xl md:text-7xl animate-typeWriter overflow-hidden border-r-8 border-gray-500 whitespace-nowrap my-0 mx-auto tracking-widest'>Welcome Here !</h1></div>}
        {showMsg&&<><div className='flex justify-center w-fit mx-auto'><h1 className='text-center mt-10 text-2xl md:text-4xl p-1 animate-typeWriter overflow-hidden border-r-8 border-gray-500 whitespace-nowrap my-0 mx-auto tracking-widest'>Do You Have an Appointment?</h1></div>
                    {showBtns&&<div className='flex justify-center mt-10'>
                        <Link to="/waiting" className='text-3xl md:text-5xl border border-gray-800 hover:bg-gray-800 hover:text-white mx-5 w-32 text-center rounded px-4 py-2 transition-all'>YES</Link>
                        <Link to="/login-register" className='text-3xl md:text-5xl border border-gray-800 bg-gray-800 text-white hover:bg-white hover:text-gray-800 mx-5 w-32 text-center rounded px-4 py-2 transition-all'>NO</Link>
                    </div>}
                </>
        }
    </div>
  )
}

export default Home