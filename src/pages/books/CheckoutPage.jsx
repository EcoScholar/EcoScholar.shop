import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { clearCart } from '../../redux/features/cart/cartSlice';
import { initializeRazorpayPayment } from '../../utils/razorpay';

import Swal from'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = parseFloat(cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2));
    const { currentUser } = useAuth()
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [createOrder, {isLoading, error}] = useCreateOrderMutation();
    const navigate = useNavigate()

    const [isChecked, setIsChecked] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('COD')
    const [paymentError, setPaymentError] = useState(null)
    const [formError, setFormError] = useState(null)

    const onSubmit = async (data) => {
        setPaymentError(null);
        setFormError(null);
        
        if (paymentMethod === 'RAZORPAY' && totalPrice < 1) {
            setPaymentError('Order amount must be at least $1 for online payment');
            return;
        }
        
        const orderData = {
            name: data.name,
            email: currentUser?.email,
            address: {
                address: data.address,
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
            paymentMethod: paymentMethod
        }
        
        try {
            if (paymentMethod === 'RAZORPAY') {
                try {
                    const result = await initializeRazorpayPayment(orderData);
                    if (result.success) {
                        await createOrder(orderData).unwrap();
                        dispatch(clearCart());
                        Swal.fire({
                            title: "Payment Successful",
                            text: "Your order has been placed successfully!",
                            icon: "success",
                            confirmButtonText: "OK"
                        });
                        navigate("/orders");
                    }
                } catch (error) {
                    console.error("Razorpay error:", error);
                    setPaymentError(error.message || 'Payment failed. Please try again.');
                }
            } else {
                await createOrder(orderData).unwrap();
                dispatch(clearCart());
                Swal.fire({
                    title: "Confirmed Order",
                    text: "Your order placed successfully!",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, It's Okay!"
                });
                navigate("/orders");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to place order. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }

    if(isLoading) return <div>Loading....</div>
    return (
        <section>
            <div className="min-h-screen p-6 pt-28 bg-transparent flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600 mb-2">Checkout</h2>
                            <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
                            <p className="text-gray-500 mb-6">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
                        </div>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            {/* Display payment errors */}
                            {paymentError && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    <p>{paymentError}</p>
                                </div>
                            )}
                            
                            {/* Display form errors */}
                            {formError && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    <p>{formError}</p>
                                </div>
                            )}
                            
                            {/* Payment Method Selection */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Payment Method</h3>
                                <div className="space-y-4">
                                    <div 
                                        className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'COD' ? 'border-blue-500 bg-blue-50' : ''}`}
                                        onClick={() => setPaymentMethod('COD')}
                                    >
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                checked={paymentMethod === 'COD'}
                                                onChange={() => setPaymentMethod('COD')}
                                                className="mr-3"
                                            />
                                            <div>
                                                <p className="font-medium text-black">Cash on Delivery</p>
                                                <p className="text-sm text-gray-900">Pay when you receive your order</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'RAZORPAY' ? 'border-blue-500 bg-blue-50' : ''}`}
                                        onClick={() => setPaymentMethod('RAZORPAY')}
                                    >
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                checked={paymentMethod === 'RAZORPAY'}
                                                onChange={() => setPaymentMethod('RAZORPAY')}
                                                className="mr-3"
                                            />
                                            <div>
                                                <p className="font-medium text-black">Pay Online (Razorpay)</p>
                                                <p className="text-sm text-gray-900">Secure online payment</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-black">
                                    <p className="font-medium text-lg">Personal Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5 text-left">
                                            <label htmlFor="full_name" className="text-black">Full Name</label>
                                            <input
                                                {...register("name", { required: "Full name is required" })}
                                                type="text" 
                                                name="name" 
                                                id="name" 
                                                className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-black ${errors.name ? 'border-red-500' : ''}`} />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                        </div>

                                        <div className="md:col-span-5 text-left">
                                            <label htmlFor="email" className="text-black">Email Address</label>
                                            <input
                                                type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-black"
                                                disabled
                                                defaultValue={currentUser?.email}
                                                placeholder="email@domain.com" />
                                        </div>
                                        <div className="md:col-span-5 text-left">
                                            <label htmlFor="phone" className="text-black">Phone Number</label>
                                            <input
                                                {...register("phone", { 
                                                    required: "Phone number is required",
                                                    pattern: {
                                                        value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                                                        message: "Please enter a valid phone number"
                                                    }
                                                })}
                                                type="tel" 
                                                name="phone" 
                                                id="phone" 
                                                className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-black ${errors.phone ? 'border-red-500' : ''}`} 
                                                placeholder="+123 456 7890" />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                        </div>

                                        <div className="md:col-span-3 text-left">
                                            <label htmlFor="address" className="text-black">Address / Street</label>
                                            <input
                                                {...register("address", { required: "Address is required" })}
                                                type="text" 
                                                name="address" 
                                                id="address" 
                                                className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-black ${errors.address ? 'border-red-500' : ''}`} 
                                                placeholder="" />
                                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                                        </div>

                                        <div className="md:col-span-2 text-left">
                                            <label htmlFor="city" className="text-black">City</label>
                                            <input
                                                {...register("city", { required: "City is required" })}
                                                type="text" 
                                                name="city" 
                                                id="city" 
                                                className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-black ${errors.city ? 'border-red-500' : ''}`} 
                                                placeholder="" />
                                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                                        </div>

                                        <div className="md:col-span-2 text-left">
                                            <label htmlFor="country" className="text-black">Country / region</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input
                                                    {...register("country", { required: "Country is required" })}
                                                    name="country" 
                                                    id="country" 
                                                    placeholder="Country" 
                                                    className={`px-4 appearance-none outline-none text-black w-full bg-transparent ${errors.country ? 'border-red-500' : ''}`} />
                                            </div>
                                            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                                        </div>

                                        <div className="md:col-span-2 text-left">
                                            <label htmlFor="state" className="text-black">State / province</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input
                                                    {...register("state", { required: "State is required" })}
                                                    name="state" 
                                                    id="state" 
                                                    placeholder="State" 
                                                    className={`px-4 appearance-none outline-none text-black w-full bg-transparent ${errors.state ? 'border-red-500' : ''}`} />
                                            </div>
                                            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                                        </div>

                                        <div className="md:col-span-1 text-left">
                                            <label htmlFor="zipcode" className="text-black">Zipcode</label>
                                            <input
                                                {...register("zipcode", { 
                                                    required: "Zipcode is required",
                                                    pattern: {
                                                        value: /^[0-9]{5,6}$/,
                                                        message: "Please enter a valid zipcode"
                                                    }
                                                })}
                                                type="text" 
                                                name="zipcode" 
                                                id="zipcode" 
                                                className={`transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-black ${errors.zipcode ? 'border-red-500' : ''}`} 
                                                placeholder="" />
                                            {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode.message}</p>}
                                        </div>

                                        <div className="md:col-span-5 mt-3 text-left">
                                            <div className="inline-flex items-center">
                                                <input
                                                    onChange={(e) => setIsChecked(e.target.checked)}
                                                    type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                                                <label htmlFor="billing_same" className="ml-2 text-black whitespace-nowrap">I agree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shopping Policy</Link></label>
                                            </div>
                                        </div>



                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    disabled={!isChecked}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Place an Order</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckoutPage