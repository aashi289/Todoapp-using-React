import React, {useState} from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-slate-900 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>TickWork.</span>
        </div>
        <ul className="flex gap-8 mx-9">
           <li className="cursor-pointer hover:font-bold transition-all"> Home</li>
           <li className="cursor-pointer hover:font-bold transition-all">Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
