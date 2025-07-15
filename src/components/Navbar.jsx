import { Link } from "react-router-dom"
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import avatarImg from '../assets/avatar.png'
import { useState } from "react";

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Orders', href: '/orders' },
  { name: 'Cart Page', href: '/cart' },
  { name: 'Check Out', href: '/checkout' },
]

const Navbar = () => {
  const currentUser = false
  const [isDropdownOpen, setisDropdownOpen] = useState(false)

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">

        {/* {left side} */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to='/'><HiMiniBars3CenterLeft className="size-6" /></Link>

          {/* search input */}
          <div className="sm:w-72 w-40 space-x-2 relative">
            <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
            <input className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 focus:outline-none rounded-md" placeholder="What are you looking for?" type="text" />
          </div>
        </div>

        {/* {right side} */}
        <div className="relative flex items-center space-x-2 md:space-x-2">
          {currentUser ? <>
            <button onClick={() => setisDropdownOpen(!isDropdownOpen)}>
              <img src={avatarImg} alt=""
                className={`size-7 rounded-full ${currentUser ? "ring ring-blue-500" : ""}`} />
            </button>
            <button>
              {/* show dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-10 right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    {navigation.map((item) => (
                      <li key={item.name} onClick={() => { setisDropdownOpen(!isDropdownOpen) }}>
                        <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100" >{item.name} </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>
          </> :
            <Link to='./login'><HiOutlineUser className="size-6" /></Link>}

          <button className="hidden sm:block">
            <HiOutlineHeart className="size-6" />
          </button>

          <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
            <HiOutlineShoppingCart /><span className="text-sm font-semibold sm:ml-1">0</span>
          </Link>
        </div>

      </nav>
    </header>
  )
}

export default Navbar
