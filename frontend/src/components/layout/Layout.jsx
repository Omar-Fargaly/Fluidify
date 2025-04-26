import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
export default function Layout() {
  return (
    <>
    <div className="flex"> 
	  <Header/>
	       <div className="flex flex-col  w-full justify-between">
         <div className="px-5">
            <Outlet />
	       </div>
    <Footer/>
	  </div>
    </div>	  
    </>
)
}
