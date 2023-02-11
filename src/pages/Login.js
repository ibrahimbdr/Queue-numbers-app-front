import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [showMsg, setShowMsg] = React.useState(false)
    setTimeout(()=>{
        setShowMsg(true);
    },2500)
    const [signDiv, setSignDiv] = React.useState(3)
    const [name, setName] = React.useState("")
    const [phone1, setPhone1] = React.useState("")
    const [phone2, setPhone2] = React.useState("")
    const handleOnSubmitLogin = (e)=>{
        e.preventDefault();
        console.log(JSON.stringify(phone1));

        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/customer/login',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({phone: phone1})
            })
            const customer = await response.json()
            console.log(customer);
            console.log(customer.token);
            localStorage.setItem('token', customer.token)
        } 
        fetchData()
        .catch(console.error);
        
        const fetchData2 = async () => {
            const response = await fetch('http://localhost:4000/appointment',{
                method: 'GET',
                headers: {'Content-Type':'application/json', 'Authorization': localStorage.getItem('token')},
            })
            const appointment = await response.json()
            console.log(appointment);
            if(appointment == null){
                setSignDiv(2)
            }else{
                navigate('/print');
            }
            
            
    
        } 
        
        fetchData2()
        .catch(console.error);
    }
   
  return (
    <div className='flex flex-col justify-center items-center w-fit mx-auto'>
       <h1 className='text-center mt-10 text-2xl md:text-4xl p-1 animate-typeWriter overflow-hidden border-r-8 border-gray-500 whitespace-nowrap my-0 mx-auto tracking-widest'>Do You Have a Login?</h1>
       {showMsg&&<><div className='flex justify-center my-10'>
                        
                        <button onClick={()=>setSignDiv(1)} className='text-3xl md:text-5xl border border-gray-800 hover:bg-gray-800 hover:text-white mx-5 w-32 text-center rounded  py-2 transition-all'>YES</button>
                        <button onClick={()=>navigate('/register')} className='text-3xl md:text-5xl border border-gray-800 bg-gray-800 text-white hover:bg-white hover:text-gray-800 mx-5 w-32 text-center rounded  py-2 transition-all'>NO</button>
                    </div>
                    {signDiv===1&&<div className=" w-72 md:w-80 lg:w-96 flex flex-col items-center">
                        <form onSubmit={handleOnSubmitLogin} className='w-full shadow-xl bg-gray-300 p-8 rounded'>
                        <h2 className='text-xl font-medium'>LOGIN</h2>
                        <label htmlFor="1" className="block w-full mt-4 pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-gray-400">Phone Number
                            </label>
                            <input
                            id="1" 
                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-base outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-gray-400" 
                            type="text" 
                            value={phone1}
                            onChange={(e) => setPhone1(e.target.value)}
                            />
                            <button type='submit' className='text-2xl my-5 rounded px-4 py-2 transition-all  border border-gray-800 hover:bg-gray-800 hover:text-white'>Submit</button>
                        </form>
                    </div>}
                    {signDiv===2&&<button type='button' onClick={()=>navigate('/print2')} className='text-2xl my-5 rounded px-4 py-2 transition-all  border border-gray-800 hover:bg-gray-800 hover:text-white'>Register an Appointment</button>}
                    
                </>
        }
    </div>
  )
}

export default Login