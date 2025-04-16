import React, { useState, useEffect } from 'react'
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
    const [screenSize, setScreenSize] = useState({
        isMobile: window.innerWidth < 768,
        isSmallMobile: window.innerWidth < 400
    });

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

    // Handle responsive layout
    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                isMobile: window.innerWidth < 768,
                isSmallMobile: window.innerWidth < 400
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    // Dynamic class names based on screen size
    const containerClasses = `bg-white ${screenSize.isSmallMobile ? 'p-1.5' : screenSize.isMobile ? 'p-2' : 'p-4'} hover:shadow-md transition-shadow duration-200 relative group cursor-pointer h-full flex flex-col items-center w-full`;
    const imageContainerClasses = `w-full ${screenSize.isSmallMobile ? 'h-36' : screenSize.isMobile ? 'h-36' : 'h-52'} ${screenSize.isSmallMobile ? 'mb-1' : screenSize.isMobile ? 'mb-2' : 'mb-4'} flex items-center justify-center overflow-hidden`;
    const titleClasses = `${screenSize.isSmallMobile ? 'text-[10px]' : screenSize.isMobile ? 'text-xs' : 'text-sm'} text-black font-medium line-clamp-2 ${screenSize.isSmallMobile ? 'h-7' : screenSize.isMobile ? 'h-8' : 'h-10'} hover:text-[#2874f0]`;
    const authorPublisherClasses = `${screenSize.isSmallMobile ? 'text-[8px]' : screenSize.isMobile ? 'text-[10px]' : 'text-xs'} text-black ${screenSize.isSmallMobile ? 'mt-0.5' : 'mt-1'} line-clamp-1`;
    const priceClasses = `${screenSize.isSmallMobile ? 'text-xs' : screenSize.isMobile ? 'text-sm' : 'text-base'} font-medium text-black`;
    const originalPriceClasses = `text-black line-through ${screenSize.isSmallMobile ? 'text-[8px]' : screenSize.isMobile ? 'text-xs' : 'text-sm'}`;
    const discountClasses = `text-green-700 ${screenSize.isSmallMobile ? 'text-[8px]' : screenSize.isMobile ? 'text-xs' : 'text-sm'} font-medium`;

    return (
        <div className={containerClasses}>
            {/* Wishlist Button */}
            <button 
                className={`absolute ${screenSize.isSmallMobile ? 'top-0.5 right-0.5' : screenSize.isMobile ? 'top-1 right-1' : 'top-2 right-2'} opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-black hover:text-red-500 z-10`}
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
                            <BsHeartFill size={screenSize.isSmallMobile ? 12 : screenSize.isMobile ? 16 : 20} className="text-red-500" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            whileHover={{ scale: 1.2 }}
                        >
                            <BsHeart size={screenSize.isSmallMobile ? 12 : screenSize.isMobile ? 16 : 20} className="text-red-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Floating Hearts Animation */}
                {showFloatingHearts && <FloatingHearts />}
            </button>

            {/* Image */}
            <Link to={`/books/${book._id}`} className="flex-shrink-0 w-full">
                <div className={imageContainerClasses}>
                    <img
                        src={`${getImgUrl(book?.coverImage)}`}
                        alt={title}
                        className="w-auto h-auto max-h-full max-w-[150%] object-contain hover:scale-105 transition-all duration-300"
                    />
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow w-full text-center">
                {/* Title */}
                <Link to={`/books/${book._id}`}>
                    <h3 className={titleClasses}>
                        {title}
                    </h3>
                </Link>

                {/* Author & Publisher */}
                <div className={authorPublisherClasses}>
                    {author && <span>{author}</span>}
                    {author && publisher && <span className={`${screenSize.isSmallMobile ? 'mx-0.5' : 'mx-1'}`}>|</span>}
                    {publisher && <span>{publisher}</span>}
                </div>

                {/* Rating */}
                <div className={`flex items-center justify-center ${screenSize.isSmallMobile ? 'gap-0.5' : screenSize.isMobile ? 'gap-1' : 'gap-2'} ${screenSize.isSmallMobile ? 'mt-0.5' : screenSize.isMobile ? 'mt-1' : 'mt-1.5'}`}>
                    <div className={`flex items-center bg-green-700 text-white ${screenSize.isSmallMobile ? 'text-[8px]' : screenSize.isMobile ? 'text-[10px]' : 'text-xs'} ${screenSize.isSmallMobile ? 'px-0.5' : screenSize.isMobile ? 'px-1' : 'px-1.5'} py-0.5 rounded`}>
                        <span className="font-medium">{rating}</span>
                        <FaStar size={screenSize.isSmallMobile ? 6 : screenSize.isMobile ? 8 : 10} className={`${screenSize.isSmallMobile ? 'ml-0.5' : screenSize.isMobile ? 'ml-0.5' : 'ml-1'}`} />
                    </div>
                    {ratingCount && (
                        <span className={`${screenSize.isSmallMobile ? 'text-[8px]' : screenSize.isMobile ? 'text-[10px]' : 'text-xs'} text-black`}>({ratingCount})</span>
                    )}
                    {assured && (
                        <img 
                            src="/assured.png" 
                            alt="Assured"
                            className={`${screenSize.isSmallMobile ? 'h-2.5' : screenSize.isMobile ? 'h-3' : 'h-4'} object-contain`} 
                        />
                    )}
                </div>

                <div className={`mt-auto ${screenSize.isSmallMobile ? 'pt-0.5' : screenSize.isMobile ? 'pt-1' : 'pt-2'}`}>
                    {/* Price */}
                    <div className={`flex items-center justify-center ${screenSize.isSmallMobile ? 'gap-0.5' : screenSize.isMobile ? 'gap-1' : 'gap-2'}`}>
                        <span className={priceClasses}>₹{newPrice}</span>
                        {originalPrice && (
                            <>
                                <span className={originalPriceClasses}>₹{originalPrice}</span>
                                {discount && (
                                    <span className={discountClasses}>{discount}% off</span>
                                )}
                            </>
                        )}
                    </div>

                    {/* Free Delivery */}
                    <div className={`${screenSize.isSmallMobile ? 'text-[8px]' : screenSize.isMobile ? 'text-[10px]' : 'text-xs'} text-black ${screenSize.isSmallMobile ? 'mt-0' : screenSize.isMobile ? 'mt-0.5' : 'mt-1'}`}>Free delivery</div>
                </div>
            </div>
        </div>
    )
}

export default BookCard
