import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery, useCancelOrderMutation } from '../../../redux/features/orders/ordersApi';

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);
    const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleCancelOrder = async (orderId) => {
        try {
            await cancelOrder(orderId).unwrap();
            setNotification({ message: 'Order cancelled successfully', type: 'success' });
            // Clear notification after 3 seconds
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        } catch (error) {
            setNotification({ message: error.data?.message || 'Failed to cancel order', type: 'error' });
            // Clear notification after 3 seconds
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error getting orders data</div>;

    return (
        <div className="bg-gray-100 py-16 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {notification.message && (
                    <div className={`mb-4 p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {notification.message}
                    </div>
                )}
                <div className="bg-white shadow-lg rounded-2xl p-8 transition-all duration-300 hover:shadow-xl">
                    <h1 className="text-3xl font-bold mb-2 text-black">User Dashboard</h1>
                    <p className="text-black mb-8 text-lg">Welcome, {currentUser?.name || 'User'}! Here are your recent orders:</p>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-6 text-black">Your Orders</h2>
                        {orders.length > 0 ? (
                            <ul className="space-y-6">
                                {orders.map((order) => (
                                    <li key={order._id} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                        <div className="border-b border-gray-200 pb-4 mb-4">
                                            <p className="font-semibold text-lg text-black">Order ID: <span className="text-black">{order._id}</span></p>
                                            <p className="text-black mt-2">Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
                                            <p className="text-black font-bold mt-2">Total: ${order.totalPrice}</p>
                                            <p className="text-black mt-2">Status: <span className={`font-semibold ${order.orderStatus === 'CANCELLED' ? 'text-red-600' : 'text-green-600'}`}>{order.orderStatus}</span></p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="font-medium text-black">Products:</p>
                                            {order.productIds.map((productId) => (
                                                <p key={productId} className="ml-4 text-black hover:text-black transition-colors duration-200">{productId}</p>
                                            ))}
                                        </div>
                                        {order.orderStatus !== 'CANCELLED' && order.orderStatus !== 'DELIVERED' && (
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                disabled={isCancelling}
                                                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
                                            >
                                                {isCancelling ? 'Cancelling...' : 'Cancel Order'}
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-black text-center py-8 bg-gray-50 rounded-xl">You have no recent orders.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
