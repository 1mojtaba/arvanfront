import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import Layout from '../Layout';
  
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    // const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    useEffect(()=>{
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
            navigate("/dashboard");
        }
        console.log(localStorage.getItem('token'))
    },[])
 
    const loginAction = (e) => {
        setValidationErrors({})
        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            "user":{
            email:email,
            password:password
           // username:username
            }
        }
        axios.post('/api/users/login', payload)
        .then((r) => {
            setIsSubmitting(false)
            localStorage.setItem('token', r.data.user.token)
            navigate("/dashboard");
        })
        .catch((e) => {
            setIsSubmitting(false)
            if (e.response.data.errors != undefined) {
                setValidationErrors(e.response.data.errors);
            }
            if (e.response.data.error != undefined) {
                setValidationErrors(e.response.data.error);
            }
        });
    }
 
     
    return  <body>
      <Layout>
      <section>
    <div class="flex flex-col items-center justify-center px-7 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full md:mt-0 sm:max-w-md xl:p-0 rounded-md bg-slate-200	">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-5xl	 leading-tight tracking-tight md:text-2x text-center text-gray-500">
                    Login
                </h1>
                <form  class="space-y-4 md:space-y-6" onSubmit={(e)=>{loginAction(e)}}>
                {Object.keys(validationErrors).length != 0 &&
                  <p className='text-center '><small className='text-danger'>Incorrect Email or Password</small></p>
                  }
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-800">Email</label>
                        <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5" required=""/>
                      </div>
                      <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-800">Password</label>
                        <input type="password"  value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5" required=""/>
                      </div>
                      <div>
                    <button type="submit" disabled={isSubmitting}  class="w-full mt-2 mb-2 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center">
            Login</button>
                  </div>
                    <p class="text-sm font-light text-black-600">
                        Don't have acount? <Link to="/register" class="font-bold text-primary-600 hover:underline">Register Now</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  </Layout>
  </body>
 
}
   
export default Login;