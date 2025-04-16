import { Link, useLocation } from "react-router-dom";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { Book, GraduationCap, Library } from "lucide-react";
import { MdSell as Sell } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { RiDashboardLine } from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { MdPayment } from "react-icons/md";

import avatarImg from "../assets/avatar.png"
import navlogo from "../assets/navlogo.png"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
    {name: "Dashboard", href:"/user-dashboard", icon: <RiDashboardLine className="size-5" />},
    {name: "Orders", href:"/orders", icon: <FiShoppingBag className="size-5" />},
    {name: "Cart Page", href:"/cart", icon: <BsCart3 className="size-5" />},
    {name: "Check Out", href:"/checkout", icon: <MdPayment className="size-5" />},
    {name: "Wishlist", href:"/wishlist", icon: <HiOutlineHeart className="size-5 text-red-500" />},
]

const menuItems = [
    {label: "Collections", href:"/all-items", icon: <Book className="w-5 h-5" />},
    {label: "Sell", href:"/Sell", icon: <Sell className="w-5 h-5" />},
    {label: "Study Materials", href:"/studymaterials", icon: <GraduationCap className="w-5 h-5" />},
    {label: "Library", href:"/library", icon: <Library className="w-5 h-5" />},
]

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const cartItems = useSelector(state => state.cart.cartItems);
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const {currentUser, logout} = useAuth()
    const location = useLocation();
    const isHomePage = location.pathname === '/' || location.pathname === '/home';
    
    const handleLogOut = () => {
        logout()
    }

    const handleNavigation = (href) => {
        window.location.href = href;
        setIsOpen(false);
    }

    // Enhanced scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            
            // Determine if we're scrolling up or down
            const isScrollingDown = currentScrollPos > prevScrollPos;
            
            // Update visibility based on scroll direction and position
            setIsVisible(!isScrollingDown || currentScrollPos < 10);
            setIsScrolled(currentScrollPos > 0);
            
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    const token = localStorage.getItem('token');
  
    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isHomePage 
                ? isScrolled 
                    ? 'bg-black/95 backdrop-blur-md shadow-md' 
                    : 'bg-transparent'
                : 'bg-black/95 shadow-md'
        } ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}>
            <header className="max-w-screen-2xl mx-auto px-4 py-3 md:py-4">
                <div className={`flex justify-between items-center bg-transparent ${isOpen ? 'bg-black/95' : 'text-gray-800'}`}>
                    {/* left side */}
                    <div className="flex items-center">
                        <img 
                            src={navlogo}
                            alt="EcoScholar Logo" 
                            className="w-16 md:w-20 h-auto cursor-pointer hover:opacity-90 transition-opacity" 
                            onClick={() => window.location.href = '/'} 
                        />
                    </div>
                    <div className="flex items-center md:gap-16 gap-2">
                        {/* Theme Menu - Hidden on mobile */}
                        <div className="hidden md:flex items-center gap-8">
                            {menuItems.map((item) => {
                                // Skip wishlist item if there are no items in it and it's a wishlist menu item
                                if (item.isWishlist && wishlistItems.length === 0) {
                                    return null;
                                }
                                
                                return (
                                    <motion.button
                                        key={item.label}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleNavigation(item.href)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${item.className || ''} ${isOpen ? 'text-gray-200 hover:text-green-500 hover:bg-gray-800' : 'text-gray-800 hover:text-green-500 hover:bg-gray-100'}`}
                                    >
                                        {item.icon}
                                        {item.label}
                                        {item.isWishlist && wishlistItems.length > 0 && (
                                            <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                                {wishlistItems.length}
                                            </span>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* right side */}
                    <div className="relative flex items-center space-x-2 md:space-x-3">
                        <div className="relative">
                            {
                                currentUser ? <>
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="focus:outline-none rounded-full"
                                >
                                    <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? '' : ''}`} />
                                </button>
                                {/* show dropdowns */}
                                {
                                    isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-gray-900 shadow-lg rounded-md z-40 border border-gray-700">
                                            <ul className="py-1">
                                                {
                                                    navigation.map((item) => (
                                                        // Only show wishlist item in the dropdown if there are wishlist items
                                                        (item.name !== "Wishlist" || (item.name === "Wishlist" && wishlistItems.length > 0)) && (
                                                            <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                                <Link to={item.href} 
                                                                    className="block px-4 py-3 text-sm bg-black/95 hover:bg-gray-800 hover:text-green-500 flex items-center gap-2 transition-colors"
                                                                >
                                                                    {item.icon}
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        )
                                                    ))
                                                }
                                                <li>
                                                    <button
                                                    onClick={handleLogOut}
                                                    className="block w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-gray-800 hover:text-green-500 transition-colors">
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                                </> : token ? <Link to="/dashboard" className='border-b-2 border-white-500 text-green-500'>Dashboard</Link> : (
                                    <Link to="/login" className="p-2"> 
                                        <HiOutlineUser className={`size-6 ${isOpen ? 'text-gray-200 hover:text-green-500' : 'text-gray-800 hover:text-green-500'}`} />
                                    </Link>
                                )
                            }
                        </div>
                        
                        {/* Only show wishlist icon when there are items in it */}
                        {wishlistItems.length > 0 && (
                            <Link to="/wishlist" className="block p-2 relative">
                                <motion.div
                                    initial={{ scale: 1 }}
                                    whileHover={{ 
                                        scale: 1.15,
                                        rotate: [0, -10, 10, -10, 0],
                                        transition: { duration: 0.5 }
                                    }}
                                    animate={{ 
                                        scale: [1, 1.2, 1],
                                        filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
                                        color: ["#ef4444", "#f87171", "#ef4444"]
                                    }}
                                    transition={{ 
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                    className="relative"
                                >
                                    {/* Pulsing circle behind the heart */}
                                    <motion.div
                                        initial={{ opacity: 0.3, scale: 1 }}
                                        animate={{ 
                                            opacity: [0.3, 0, 0.3],
                                            scale: [1, 1.5, 1]
                                        }}
                                        transition={{ 
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatType: "loop"
                                        }}
                                        className="absolute inset-0 bg-red-200 rounded-full -z-10"
                                    ></motion.div>
                                    
                                    <HiOutlineHeart className={`size-6 text-red-500`} />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-lg shadow-red-300">
                                        {wishlistItems.length}
                                    </span>
                                </motion.div>
                            </Link>
                        )}

                        <Link to="/cart" className="bg-green-600 hover:bg-green-700 p-2 sm:px-6 flex items-center rounded-md text-white transition-colors">
                            <HiOutlineShoppingCart className='size-5' />
                            {
                                cartItems.length > 0 ? <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span> : <span className="text-sm font-semibold sm:ml-1">0</span>
                            }
                        </Link>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none"
                            aria-label="Toggle mobile menu"
                        >
                            <HiMiniBars3CenterLeft className={`size-6 ${isOpen ? 'text-green-500' : 'text-gray-800'}`} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Enhanced */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden backdrop-blur-md rounded-b-2xl"
                        >
                            <motion.div 
                                initial={{ y: -20 }}
                                animate={{ y: 0 }}
                                exit={{ y: -20 }}
                                className="px-2 py-4 space-y-2"
                            >
                                {menuItems.map((item, index) => (
                                    <motion.button
                                        key={item.label}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleNavigation(item.href)}
                                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-200 hover:text-green-500 hover:bg-gray-800/80 active:bg-gray-800 transition-all duration-200 font-bold text-left"
                                    >
                                        {item.icon}
                                        <span className="font-bold capitalize">{item.label}</span>
                                    </motion.button>
                                ))}
                                {/* Only show wishlist for mobile when there are items */}
                                {wishlistItems.length > 0 && (
                                    <motion.button
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        transition={{ delay: menuItems.length * 0.1 }}
                                        onClick={() => handleNavigation('/wishlist')}
                                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-200 hover:text-green-500 hover:bg-gray-800/80 active:bg-gray-800 transition-all duration-200 font-bold text-left"
                                    >
                                        <div className="relative">
                                            <motion.div
                                                initial={{ scale: 1 }}
                                                animate={{ 
                                                    scale: [1, 1.2, 1],
                                                    filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
                                                    color: ["#ef4444", "#f87171", "#ef4444"]
                                                }}
                                                transition={{ 
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    repeatType: "loop"
                                                }}
                                                className="relative"
                                            >
                                                {/* Pulsing effect behind heart */}
                                                <motion.div
                                                    initial={{ opacity: 0.3, scale: 1 }}
                                                    animate={{ 
                                                        opacity: [0.3, 0, 0.3],
                                                        scale: [1, 1.5, 1]
                                                    }}
                                                    transition={{ 
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        repeatType: "loop"
                                                    }}
                                                    className="absolute inset-0 bg-red-200 rounded-full -z-10"
                                                ></motion.div>
                                                <HiOutlineHeart className="size-5 text-red-500" />
                                            </motion.div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-bold capitalize text-red-500">Wishlist</span>
                                            <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-md">
                                                {wishlistItems.length}
                                            </span>
                                        </div>
                                    </motion.button>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </nav>
    )
}

export default Navbar;