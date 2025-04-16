import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineHeart, HiOutlineShoppingCart, HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { AnimatePresence } from 'framer-motion';
import { Book, Sell, GraduationCap, Library } from 'lucide-react';

const Navbar = () => {
    const [isHomePage, setIsHomePage] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    const menuItems = [
        {label: "ALL ITEMS", href:"/all-items", icon: <Book className="w-5 h-5" />},
        {label: "SELL", href:"/sell", icon: <Sell className="w-5 h-5" />},
        {label: "STUDY MATERIALS", href:"/studymaterials", icon: <GraduationCap className="w-5 h-5" />},
        {label: "LIBRARY", href:"/library", icon: <Library className="w-5 h-5" />},
    ];

    const navigation = [
        {name: "DASHBOARD", href:"/user-dashboard"},
        {name: "ORDERS", href:"/orders"},
        {name: "CART PAGE", href:"/cart"},
        {name: "CHECK OUT", href:"/checkout"},
    ];

    const handleNavigation = (href) => {
        // Implement navigation logic
    };

    const handleLogOut = () => {
        // Implement logout logic
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 nav-container ${
            isHomePage 
                ? isScrolled 
                    ? 'bg-black/95 backdrop-blur-md shadow-md' 
                    : 'bg-transparent'
                : 'bg-black/95 shadow-md'
        } ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}>
            <header className="max-w-screen-2xl mx-auto px-4 py-3 md:py-6">
                <div className={`flex justify-between items-center bg-transparent ${isOpen ? 'bg-black/95' : 'text-white'}`}>
                    {/* Logo */}
                    <img src={pickImg} alt="" className="w-8 h-8 md:w-10 md:h-10 cursor-pointer nav-logo" onClick={() => window.location.href = '/'} />
                    
                    {/* Search and Menu */}
                    <div className="flex items-center md:gap-16 gap-2">
                        <div className="hidden md:flex items-center gap-8">
                            {menuItems.map((item) => (
                                <motion.button
                                    key={item.label}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleNavigation(item.href)}
                                    className="nav-button flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 text-white"
                                >
                                    {item.icon}
                                    {item.label}
                                </motion.button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative sm:w-72 w-full max-w-[160px]">
                            <IoSearchOutline className="absolute inline-block left-3 inset-y-2 text-white" />
                            <input type="text" placeholder="SEARCH"
                                className="nav-search w-full py-2 md:py-1 pl-10 pr-4 text-sm rounded-md"
                            />
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="relative flex items-center space-x-2 md:space-x-3">
                        {/* User Avatar/Login */}
                        <div className="relative">
                            {currentUser ? (
                                <>
                                    <button 
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="nav-button focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
                                    >
                                        <img src={avatarImg} alt="" className="size-7 rounded-full" />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="nav-dropdown absolute right-0 mt-2 w-48 rounded-md z-40">
                                            <ul className="py-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                        <Link to={item.href} 
                                                            className="nav-dropdown-item block px-4 py-3 text-sm"
                                                        >
                                                            {item.icon}
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li>
                                                    <button
                                                        onClick={handleLogOut}
                                                        className="nav-dropdown-item block w-full text-left px-4 py-3 text-sm"
                                                    >
                                                        LOGOUT
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </>
                            ) : (
                                // ... existing login button code ...
                            )}
                        </div>
                        
                        {/* Other Icons */}
                        <button className="hidden sm:block nav-button p-2">
                            <HiOutlineHeart className="size-6 text-white" />
                        </button>

                        <Link to="/cart" className="nav-button bg-green-600 hover:bg-green-700 p-2 sm:px-6 flex items-center rounded-md text-white">
                            <HiOutlineShoppingCart className='size-5' />
                            {cartItems.length > 0 ? <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span> : <span className="text-sm font-semibold sm:ml-1">0</span>}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="nav-menu-button md:hidden p-2 rounded-lg"
                            aria-label="Toggle mobile menu"
                        >
                            <HiMiniBars3CenterLeft className={`size-6 text-white`} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu remains unchanged */}
                <AnimatePresence>
                    {/* ... existing mobile menu code ... */}
                </AnimatePresence>
            </header>
        </nav>
    )
}

export default Navbar; 