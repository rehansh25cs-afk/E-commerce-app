import React from 'react'

const Navbar = () => {
  return (
    <div className=' bg-[#ffbcc768] px-22  py-7 flex justify-between  '>
      <h3 className=' text-orange-400 text-3xl font-medium  '>Vibbixo</h3>
      <div className=' flex gap-8 '>
        <a href="#">Products</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

    </div>
  )
}

export default Navbar
