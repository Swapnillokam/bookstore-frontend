import { Link } from "react-router-dom"
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

const Navbar = () => {
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* {left side} */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to='/'><HiMiniBars3CenterLeft className="size-6" /></Link>

          <div>
            <IoSearchOutline />
            <input className="bg-s w-full py-1 md:px-8 px-6 focus:outline-none rounded-md" placeholder="search here" type="text" name="" id="" />
          </div>
        </div>
        {/* {right side} */}
        <div>
          navitems
        </div>
      </nav>
    </header>
  )
}

export default Navbar
