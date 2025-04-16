import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { removeFromWishlist, clearWishlist } from '../../redux/features/wishlist/wishlistSlice';
import { BsCartPlus, BsTrash } from 'react-icons/bs';

const WishlistPage = () => {
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const dispatch = useDispatch();

    const handleRemoveFromWishlist = (product) => {
        dispatch(removeFromWishlist(product))
    }

    const handleClearWishlist = () => {
        dispatch(clearWishlist())
    }

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        // Optionally remove from wishlist after adding to cart
        // dispatch(removeFromWishlist(product));
    }

    return (
        <>
            <div className="flex mt-12 w-full flex-col overflow-hidden bg-white shadow-xl rounded-lg">
                <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
                    <div className="flex items-start justify-between border-b pb-4">
                        <div className="text-2xl font-bold text-gray-900">My Wishlist</div>
                        {wishlistItems.length > 0 && (
                            <div className="ml-3 flex h-7 items-center">
                                <button
                                    type="button"
                                    onClick={handleClearWishlist}
                                    className="relative px-4 py-2 bg-black text-green-500 rounded-md hover:bg-green-500 hover:text-black transition-all duration-300 transform hover:scale-105"
                                >
                                    <span className="font-medium">Clear Wishlist</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-8">
                        <div className="flow-root">
                            {
                                wishlistItems.length > 0 ? (
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {
                                            wishlistItems.map((product) => (
                                                <li key={product?._id} className="flex py-8 hover:bg-gray-50 transition-all duration-300 rounded-lg px-4">
                                                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                                                        <Link to={`/books/${product._id}`}>
                                                            <img
                                                                alt={product?.title}
                                                                src={`${getImgUrl(product?.coverImage)}`}
                                                                className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                                            />
                                                        </Link>
                                                    </div>

                                                    <div className="ml-6 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                                <h3 className="text-lg hover:text-green-600 transition-colors">
                                                                    <Link to={`/books/${product._id}`}>{product?.title}</Link>
                                                                </h3>
                                                                <p className="sm:ml-4 text-xl font-bold text-green-600">${product?.newPrice}</p>
                                                            </div>
                                                            <p className="mt-2 text-sm text-gray-600 capitalize"><strong>Category: </strong>{product?.category}</p>
                                                            {product?.author && (
                                                                <p className="mt-1 text-sm text-gray-600"><strong>Author: </strong>{product?.author}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <div className="flex space-x-4 mt-4">
                                                                <button
                                                                    onClick={() => handleAddToCart(product)}
                                                                    type="button"
                                                                    className="font-medium px-4 py-2 bg-black text-green-500 rounded-md hover:bg-green-500 hover:text-black transition-all duration-300 flex items-center gap-2">
                                                                    <BsCartPlus size={18} />
                                                                    Add to Cart
                                                                </button>
                                                                <button
                                                                    onClick={() => handleRemoveFromWishlist(product)}
                                                                    type="button"
                                                                    className="font-medium text-red-600 px-4 py-2 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center gap-2">
                                                                    <BsTrash size={16} />
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-16 w-16 text-gray-400" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={1.5} 
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-xl font-medium text-gray-600 mb-2">Your wishlist is empty</p>
                                        <p className="text-gray-500 text-lg mb-8">Save your favorite items to your wishlist and come back to them anytime.</p>
                                        <Link 
                                            to="/all-items" 
                                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-block"
                                        >
                                            Browse Products
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-6 py-8 sm:px-8 bg-gray-50">
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <Link to="/" className="flex items-center">
                            <button
                                type="button"
                                className="font-medium text-green-600 hover:text-green-500 transition-colors duration-300"
                            >
                                Continue Shopping
                                <span aria-hidden="true" className="ml-1"> &rarr;</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WishlistPage 