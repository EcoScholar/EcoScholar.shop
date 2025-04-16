import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../../redux/features/wishlist/wishlistSlice'
import { motion, AnimatePresence } from 'framer-motion'

const FloatingHearts = () => {
    // Create an array of heart animations with different paths and timings
    return Array.from({ length: 6 }).map((_, index) => (
        <motion.div
            key={index}
            initial={{ 
                opacity: 1, 
                scale: 0, 
                x: 0, 
                y: 0 
            }}
            animate={{ 
                opacity: 0,
                scale: Math.random() * 0.5 + 0.5,
                x: (Math.random() - 0.5) * 40, 
                y: -30 - Math.random() * 20
            }}
            transition={{ 
                duration: 0.8 + Math.random() * 0.5,
                ease: "easeOut" 
            }}
            className="absolute top-0 right-0 pointer-events-none"
        >
            <BsHeartFill 
                size={index % 2 === 0 ? 10 : 8} 
                className="text-red-500" 
            />
        </motion.div>
    ));
};

const BookCard = ({book}) => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const isInWishlist = wishlistItems.some(item => item._id === book._id);
    const [animateHeart, setAnimateHeart] = useState(false);
    const [showFloatingHearts, setShowFloatingHearts] = useState(false);

    const {
        title,
        author,
        publisher,
        rating,
        ratingCount,
        originalPrice,
        newPrice,
        discount,
        assured = false
    } = book;

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isInWishlist) {
            dispatch(removeFromWishlist(book));
        } else {
            setAnimateHeart(true);
            setShowFloatingHearts(true);
            dispatch(addToWishlist(book));
            
            // Reset animation states
            setTimeout(() => setAnimateHeart(false), 700);
            setTimeout(() => setShowFloatingHearts(false), 1000);
        }
    }

    return (
        <div className="bg-white p-3 hover:shadow-md transition-shadow duration-200 relative group cursor-pointer">
            {/* Wishlist Button */}
            <button 
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-black hover:text-red-500 z-10"
                onClick={handleWishlistToggle}
            >
                <AnimatePresence>
                    {isInWishlist ? (
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{ 
                                scale: animateHeart ? [1, 1.5, 1] : 1,
                                rotate: animateHeart ? [0, -15, 15, -15, 0] : 0
                            }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <BsHeartFill size={20} className="text-red-500" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            whileHover={{ scale: 1.2 }}
                        >
                            <BsHeart size={20} className="text-red-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Floating Hearts Animation */}
                {showFloatingHearts && <FloatingHearts />}
            </button>

            {/* Image */}
            <Link to={`/books/${book._id}`}>
                <div className="aspect-[3/4] mb-3 flex items-center justify-center">
                    <img
                        src={`${getImgUrl(book?.coverImage)}`}
                        alt={title}
                        className="max-h-full max-w-full object-contain hover:scale-105 transition-all duration-200"
                    />
                </div>
            </Link>

            {/* Content */}
            <div>
                {/* Title */}
                <Link to={`/books/${book._id}`}>
                    <h3 className="text-sm text-black line-clamp-2 hover:text-[#2874f0]">
                        {title}
                    </h3>
                </Link>

                {/* Author & Publisher */}
                <div className="text-xs text-black mt-1">
                    {author && <span>{author}</span>}
                    {author && publisher && <span className="mx-1">|</span>}
                    {publisher && <span>{publisher}</span>}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center bg-green-700 text-white text-xs px-1.5 py-0.5 rounded">
                        <span className="font-medium">{rating}</span>
                        <FaStar size={10} className="ml-1" />
                    </div>
                    {ratingCount && (
                        <span className="text-xs text-black">({ratingCount})</span>
                    )}
                    {assured && (
                        <img 
                            src="/assured.png" 
                            alt="Assured"
                            className="h-4 object-contain" 
                        />
                    )}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-base font-medium text-black">₹{newPrice}</span>
                    {originalPrice && (
                        <>
                            <span className="text-black line-through text-sm">₹{originalPrice}</span>
                            {discount && (
                                <span className="text-green-700 text-sm font-medium">{discount}% off</span>
                            )}
                        </>
                    )}
                </div>

                {/* Free Delivery */}
                <div className="text-xs text-black mt-1">Free delivery</div>
            </div>
        </div>
    )
}

export default BookCard
