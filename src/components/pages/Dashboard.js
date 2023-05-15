import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

// import Layout from '../Layout';
// dropdown class
function dropdown(){
    let hide = document.querySelector("#dropdown").className;
    if(hide=="hidden"){
        document.querySelector("#dropdown").classList.remove("hidden");
    }else{
        document.querySelector("#dropdown").classList.add("hidden");
    }
}


function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState("")
    // console.log({username},"moooj");
 
    useEffect(()=>{
        if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
            navigate("/");
        }else {
            getUser()
        }
    },[])
 
    const getUser = () => {
        axios.get('/api/user',{ headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((r) => {
            setUser(r.data)
            console.log(user.username)
        })
        .catch((e) => {
            console.log(e)
        });
    }
 
    const logoutAction = () => {
        axios.post('/api/users/login')
        .then((r) => {
            localStorage.removeItem('token', '')
           navigate("/");
        })
        .catch((e) => {
            console.log(e)
        });
    }
    getUser();
    return (
        
        // <Layout>
 <section>
    <div class="w-full bg-zinc-800 flex justify-between items-center">
        <div class="text-white flex justify-items-start	justify-start ml-4 py-4 justify-start">
        <h1 class="text-2xl">Arvan Challenge</h1>
        <span class="text-base ml-5 mt-1.5">Welcome, {user.username}!</span>
    </div>
    <div>
      <span class="border-2	border-sky-300	border-solid	rounded	px-4	py-2.5 text-sky-300 mr-4">
        <button no-underline onClick={()=>logoutAction()}><Link to="/">Logout</Link></button>
      </span>
    </div>
    </div>
    <section class="flex"> 
    <div class="w-64 h-screen bg-blue-600 text-white">
        <h2 class="py-2 ml-4 text-3xl">Post</h2>
        <div class="list-none ml-9 mt-6 text-lg">
            <li>All Articles</li>
            <li class="mt-7">New Article</li>
        </div>
    </div>
    <div>
        <h2 class="mt-5	ml-6 text-5xl">All Posts</h2>
        
<div class="relative shadow-md ml-7">
    <table class="w-full text-sm text-left text-gray-100 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-zinc-300">
            <tr class="flex">
                <th scope="col" class="pl-4 py-3">
                    #
                </th>
                <th scope="col" class="pl-9 py-3">
                Title
                </th>
                <th scope="col" class="pl-52 py-3">
                Author
                </th>
                <th scope="col" class="pl-36 py-3">
                Tags
                </th>
                <th scope="col" class="pl-44 py-3">
                Excerpt
                </th>
                <th scope="col" class="pl-80 pr-3 py-3">
                Created
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b flex dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="pl-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                    1
                </th>
                <td class="pl-9 py-3">
                    Silver
                </td>
                <td class="pl-52 py-3">
                    Laptop
                </td>
                <td class="pl-36 py-3">
                    $2999
                </td>
                <td class="pl-44 py-3">
                    $2999
                </td>
                <td class="pl-80 pr-3 py-3 text-right">
                <div class="relative inline-block text-left">
  <div>
    <button type="button" onClick={dropdown} class="inline-flex text-white w-full justify-center gap-x-1.5 rounded-md bg-sky-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-sky-300" id="menu-button" aria-expanded="true" aria-haspopup="true">
      ...
      <svg class="-mr-1 h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="hidden" id="dropdown" role="none">
      <a href="#" class="no-underline text-gray-700 block px-4 py-2 text-sm text-black" role="menuitem" tabindex="-1" id="menu-item-0">Edit</a>
      <a href="#" class="no-underline text-gray-700 block px-4 py-2 text-sm text-black" role="menuitem" tabindex="-1" id="menu-item-1">Delete</a>
    </div>
  </div>
</div>

                </td>
            </tr>

        </tbody>
    </table>
</div>

    </div>
    </section>
  </section>
        // </Layout>
    );
}
   
export default Dashboard;

