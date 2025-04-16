import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch =  useDispatch()

    const totalPrice =  cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
    }

    const handleClearCart  = () => {
        dispatch(clearCart())
    }
    return (
        <>
            <div className="flex mt-12 w-full flex-col overflow-hidden bg-white shadow-xl rounded-lg">
                <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
                    <div className="flex items-start justify-between border-b pb-4">
                        <div className="text-2xl font-bold text-gray-900">Shopping cart</div>
                        <div className="ml-3 flex h-7 items-center">
                            <button
                                type="button"
                                onClick={handleClearCart}
                                className="relative px-4 py-2 bg-black text-green-500 rounded-md hover:bg-green-500 hover:text-black transition-all duration-300 transform hover:scale-105"
                            >
                                <span className="font-medium">Clear Cart</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flow-root">
                            {
                                cartItems.length > 0 ? (
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {
                                            cartItems.map((product) => (
                                                <li key={product?._id} className="flex py-8 hover:bg-gray-50 transition-all duration-300 rounded-lg px-4">
                                                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                                                        <img
                                                            alt=""
                                                            src={`${getImgUrl(product?.coverImage)}`}
                                                            className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>

                                                    <div className="ml-6 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                                <h3 className="text-lg hover:text-green-600 transition-colors">
                                                                    <Link to='/'>{product?.title}</Link>
                                                                </h3>
                                                                <p className="sm:ml-4 text-xl font-bold text-green-600">${product?.newPrice}</p>
                                                            </div>
                                                            <p className="mt-2 text-sm text-gray-600 capitalize"><strong>Category: </strong>{product?.category}</p>
                                                        </div>
                                                        <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                                                            <p className="text-gray-600"><strong>Qty:</strong> 1</p>

                                                            <div className="flex">
                                                                <button
                                                                    onClick={() => handleRemoveFromCart(product)}
                                                                    type="button"
                                                                    className="font-medium text-red-600 hover:text-red-500 transition-colors duration-300">
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                ) : (<p className="text-center text-gray-500 text-lg py-8">No product found!</p>)
                            }
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-6 py-8 sm:px-8 bg-gray-50">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                        <p>Subtotal</p>
                        <p className="text-green-600">${totalPrice ? totalPrice : 0}</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-8">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-green-500 shadow-lg hover:bg-green-500 hover:text-black transition-all duration-300 transform hover:scale-105"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <Link to="/" className="flex items-center">
                            or
                            <button
                                type="button"
                                className="font-medium text-green-600 hover:text-green-500 transition-colors duration-300 ml-2"
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

export default CartPage