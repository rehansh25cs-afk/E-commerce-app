import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Products', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <nav className='bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm'>
      {/* Logo */}
      <Link to='/' className='text-2xl font-bold text-orange-400 tracking-wide no-underline'>
        Vibbixo
      </Link>

      {/* Desktop Links */}
      <div className='hidden sm:flex gap-6 items-center'>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-medium no-underline transition-colors duration-200 pb-1 border-b-2 ${
              location.pathname === link.path
                ? 'text-orange-400 border-orange-400'
                : 'text-gray-600 border-transparent hover:text-orange-400 hover:border-orange-200'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <button
        className='sm:hidden flex flex-col gap-1.5 cursor-pointer'
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`block h-0.5 w-6 bg-gray-600 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block h-0.5 w-6 bg-gray-600 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block h-0.5 w-6 bg-gray-600 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='absolute top-full left-0 w-full bg-white border-t border-gray-200 flex flex-col sm:hidden shadow-md'>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`px-8 py-4 text-sm font-medium no-underline border-b border-gray-100 ${
                location.pathname === link.path ? 'text-orange-400 bg-orange-50' : 'text-gray-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
