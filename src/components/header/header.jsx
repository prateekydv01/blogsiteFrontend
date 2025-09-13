import React, { useState } from 'react'
import '../../index.css'
import { Container, LogoutBtn, Logo } from '../index'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu, X } from 'lucide-react' // optional icon lib like lucide-react or heroicons

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    {
       name: 'Home',
       slug: '/', 
       active: true 
    },

    { name: 'Login', 
      slug: '/login', 
      active: !authStatus 
    },

    { name: 'Signup', 
      slug: '/signup', 
      active: !authStatus 
    },

    { name: 'All Posts',
      slug: '/all-posts', 
      active: authStatus 
    },

    { name: 'Add Post'
      , slug: '/add-post', 
      active: authStatus 
    },
    
    { name: 'Active Posts', 
      slug: '/active-posts', 
      active: authStatus 
    },
    { name: 'Inactive Posts'
      , slug: '/inactive-posts'
      , active: authStatus 
    }
      
  ]

  return (
    <header className='shadow header_div bg-slate-800 text-white'>
      <Container>
        <nav className='flex  justify-between'>
          {/* Logo */}
          <Link to='/'>
            <Logo className="py-10" width='70px' />
          </Link>

          {/* Hamburger Icon (visible on small screens) */}
          <div className='lg:hidden'>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className='hidden lg:flex items-center gap-4'>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      className={`px-4 py-2 rounded-full hover:bg-white hover:text-black transition duration-200 ${
                        location.pathname === item.slug
                          ? 'bg-blue-200 text-black'
                          : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='lg:hidden header_mobile mt-4 text-white rounded-md shadow-lg'>
            <ul className='flex flex-col gap-2 p-4'>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <Link
                        to={item.slug}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block w-full px-4 py-2 rounded hover:bg-blue-100 hover:text-black ${
                          location.pathname === item.slug
                            ? 'bg-blue-300 text-black'
                            : ''
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header
