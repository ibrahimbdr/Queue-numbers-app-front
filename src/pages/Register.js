import React from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [showMsg, setShowMsg] = React.useState(false)
    setTimeout(()=>{
        setShowMsg(true);
    },2500)
    const [name, setName] = React.useState("")
    const [phone2, setPhone2] = React.useState("")
   
    const handleOnSubmitRegister = (e)=>{
        e.preventDefault();
        console.log(name);
        console.log(phone2);
        
        const fetchData = async () => {
                const response = await fetch('http://localhost:4000/customer',{
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({name: name, phone: phone2})
                })
                const customer = await response.json()
                console.log(customer);
                
            } 
            fetchData()
            .catch(console.error);
        const fetchData2 = async () => {
            const response = await fetch('http://localhost:4000/customer/login',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({phone: phone2})
            })
            const customer = await response.json()
            console.log(customer);
            console.log(customer.token);
            localStorage.setItem('token', customer.token)
        } 
        fetchData2()
        .catch(console.error);
        
        
        
        navigate('/print2')
    }
        
  return (
    <div className='flex flex-col justify-center items-center w-fit mx-auto'>
       <h1 className='text-center mt-10 text-2xl md:text-4xl p-1 animate-typeWriter overflow-hidden border-r-8 border-gray-500 whitespace-nowrap my-0 mx-auto tracking-widest'>Please Enter Your Data</h1>
       
       <div className="group my-10 w-72 md:w-80 lg:w-96">
                        <form onSubmit={handleOnSubmitRegister} className='w-full shadow-xl bg-gray-300 p-8 rounded'>
                            <h2 className='text-xl font-medium'>REGISTER</h2>
                        <label htmlFor="2" className="block w-full mt-4 pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-gray-400">Name
                            </label>
                            <input
                            id="2" 
                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-base outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-gray-400" 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        <label  htmlFor="3" className="block w-full mt-4 pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-gray-400">Phone Number
                            </label>
                            <input
                            id="3" 
                            className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-base outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-gray-400" 
                            type="text" 
                            value={phone2}
                            onChange={(e) => setPhone2(e.target.value)}
                            />
                            <button type='submit' className='text-2xl my-5 rounded px-4 py-2 transition-all  border border-gray-800 hover:bg-gray-800 hover:text-white'>Submit</button>
                        </form>
                    </div>
                    
          
    </div>
  )
}

export default Register