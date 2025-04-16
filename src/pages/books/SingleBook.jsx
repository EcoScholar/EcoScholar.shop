import React, { useState } from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/features/wishlist/wishlistSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const FloatingHearts = () => {
    // Create an array of heart animations with different paths and timings
    return Array.from({ length: 8 }).map((_, index) => (
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
                scale: Math.random() * 0.6 + 0.5,
                x: (Math.random() - 0.5) * 60, 
                y: -40 - Math.random() * 30
            }}
            transition={{ 
                duration: 1 + Math.random() * 0.6,
                ease: "easeOut" 
            }}
            className="absolute top-0 right-0 pointer-events-none"
        >
            <BsHeartFill 
                size={index % 2 === 0 ? 14 : 10} 
                className="text-red-500" 
            />
        </motion.div>
    ));
};

const SingleBook = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);
    const [animateHeart, setAnimateHeart] = useState(false);
    const [showFloatingHearts, setShowFloatingHearts] = useState(false);

    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const isInWishlist = book && wishlistItems.some(item => item._id === book._id);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    const handleBuyNow = (product) => {
        dispatch(addToCart(product));
        navigate('/checkout');
    }

    const handleWishlistToggle = (product) => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(product));
        } else {
            setAnimateHeart(true);
            setShowFloatingHearts(true);
            dispatch(addToWishlist(product));
            
            // Reset animation states
            setTimeout(() => setAnimateHeart(false), 700);
            setTimeout(() => setShowFloatingHearts(false), 1200);
        }
    }

    if(isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    if(isError) return <div className="min-h-screen flex items-center justify-center text-red-500">Error loading book information</div>
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    {/* Left Column - Image */}
                    <div className="md:w-1/2 p-8">
                        <img
                            src={`${getImgUrl(book.coverImage)}`}
                            alt={book.title}
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                        />
                    </div>

                    {/* Right Column - Book Details */}
                    <div className="md:w-1/2 p-8">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>
                            <button 
                                onClick={() => handleWishlistToggle(book)}
                                className="ml-4 p-2 rounded-full transition-colors duration-300 relative"
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
                                            <BsHeartFill size={28} className="text-red-500" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            whileHover={{ 
                                                scale: 1.2,
                                                color: "#ef4444" 
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <BsHeart size={28} className="text-red-500" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                
                                {/* Floating Hearts Animation */}
                                {showFloatingHearts && <FloatingHearts />}
                            </button>
                        </div>
                        
                        <div className="space-y-4 mb-8">

                            <p className="text-lg">
                                <span className="font-semibold text-gray-700">Author:</span>
                                <span className="ml-2 text-gray-600">{book.author || 'admin'}</span>
                            </p>
                            
                            <p className="text-lg">
                                <span className="font-semibold text-gray-700">Published:</span>
                                <span className="ml-2 text-gray-600">{new Date(book?.createdAt).toLocaleDateString()}</span>
                            </p>
                            
                            
                            
                            <p className="text-lg">
                                <span className="font-semibold text-gray-700">Product Name:</span>
                                <span className="ml-2 text-gray-600">{book.title}</span>
                            </p>
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
                            <p className="text-gray-600 leading-relaxed">{book.description}</p>
                        </div>
                            <div className="text-lg">
                                <span className="font-semibold text-gray-700">Price:</span>
                                <span className="ml-2 text-2xl text-green-600 font-bold">₹{book?.newPrice}</span>
                                {book?.oldPrice && (
                                    <span className="ml-3 text-gray-500 line-through">₹{book?.oldPrice}</span>
                                )}
                            </div>
                        </div>


                        <div className="flex flex-col md:flex-row gap-4">
                            <button 
                                onClick={() => handleAddToCart(book)} 
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out flex items-center justify-center gap-2"
                            >
                                <FiShoppingCart className="text-xl" />
                                <span>Add to Cart</span>
                            </button>

                            <button 
                                onClick={() => handleBuyNow(book)}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleBook
