import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import Layout from '../Layout';
  
function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    useEffect(()=>{
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
            navigate("/dashboard");
        }
    },[])
 
    const registerAction = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            "user": {
                email: email,
                password: password,
                username: username
              }
        }
        // console.log({payload})
        axios.post('/api/users', payload)
        .then((r) => {
            setIsSubmitting(false)
            localStorage.setItem('token', r.user.token)
            navigate("/dashboard");
        })
        .catch((e) => {
            setIsSubmitting(false)
            if (e.response.data.errors != undefined) {
                setValidationErrors(e.response.data.errors);
            }
        });
    }
     
    return ( <body>
    <Layout>
    <section>
    <div class="flex flex-col items-center justify-center px-7 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full md:mt-0 sm:max-w-md xl:p-0 bg-slate-200">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-5xl	 leading-tight tracking-tight text-gray-500 md:text-2x text-center">
                    Register
                </h1>

                <form class="space-y-4 md:space-y-6" onSubmit={(e)=>registerAction(e)} className='login-form'>
                    <div>
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-800">User</label>
                        <input type="text" name="username" id="username"  value={username} onChange={(e)=>{setUsername(e.target.value)}} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5" required=""/>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-800">Email</label>
                        <input type="email" name="email" id="email"
                         value={email} onChange={(e)=>{setEmail(e.target.value)}} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5" required=""/>
                        {validationErrors.email != undefined &&
                              <div className="flex flex-col">
                                <small  className="text-danger">
                                  {validationErrors.email[0]}
                                  </small >
                                 </div>
                        }
                      </div>
                      <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-800">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5" required=""/>
                        {validationErrors.password != undefined &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {validationErrors.password[0]}
                                            </small >
                                        </div>
                         }
                      </div>
                      <div>
                    <button type="submit"  disabled={isSubmitting} class="w-full mt-2 mb-2 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center">Register</button>
                  </div>
                    <p class="text-sm font-light text-black-600">
                        Already Registered? <Link to="/" class="font-bold text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  </Layout>
  </body>
  );
}
   
export default Register;