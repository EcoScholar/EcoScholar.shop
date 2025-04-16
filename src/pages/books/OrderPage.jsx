import React, { useState } from 'react'
import { useGetOrderByEmailQuery, useCancelOrderMutation } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);
    const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleCancelOrder = async (orderId) => {
        try {
            await cancelOrder(orderId).unwrap();
            setNotification({ message: 'Order cancelled successfully', type: 'success' });
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        } catch (error) {
            console.error('Cancel order error:', error);
            setNotification({ 
                message: error.data?.message || 'Failed to cancel order', 
                type: 'error' 
            });
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        }
    };

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error getting orders data</div>

    const activeOrders = orders.filter(order => order.orderStatus !== 'CANCELLED');

    return (
        <div className='container mx-auto p-8 min-h-screen bg-gray-50'>
            {notification.message && (
                <div className={`mb-4 p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {notification.message}
                </div>
            )}
            <h2 className='text-3xl font-bold mb-8 text-black border-b pb-4'>Your Orders</h2>
            {activeOrders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                    <p className="text-black text-lg">No active orders found!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {activeOrders.map((order) => (
                        <div key={order._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="border-b border-gray-200 pb-4 mb-4">
                                <p className="font-semibold text-lg text-black">Order ID: <span className="text-gray-600">{order._id}</span></p>
                                <p className="text-black mt-2">Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
                                <p className="text-black font-bold mt-2">Total: ${order.totalPrice}</p>
                                <p className="text-black mt-2">Status: <span className="font-semibold text-green-600">{order.orderStatus}</span></p>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-black">Products:</p>
                                {order.productIds.map((productId) => (
                                    <p key={productId} className="ml-4 text-gray-600">{productId}</p>
                                ))}
                            </div>
                            {order.orderStatus !== 'DELIVERED' && (
                                <button
                                    onClick={() => handleCancelOrder(order._id)}
                                    disabled={isCancelling}
                                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
                                >
                                    {isCancelling ? 'Cancelling...' : 'Cancel Order'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;