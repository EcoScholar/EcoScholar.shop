import { baseURL } from './baseURL';

export const initializeRazorpayPayment = async (orderData) => {
  try {
    console.log('Initializing Razorpay payment with order data:', orderData);

    // Create order on backend
    const response = await fetch(`${baseURL}/api/orders/razorpay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    console.log('Backend response:', data);
    
    // Check for error response from backend
    if (!response.ok) {
      const errorMessage = data.error?.description || 'Failed to create order';
      console.error('Backend error:', data.error);
      throw new Error(errorMessage);
    }
    
    if (!data.razorpayOrder) {
      console.error('No Razorpay order in response');
      throw new Error('Failed to create order');
    }

    return new Promise((resolve, reject) => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: 'EcoScholar',
        description: 'Book Purchase',
        image: 'https://your-company-logo-url.png',
        order_id: data.razorpayOrder.id,
        handler: async function (response) {
          console.log('Payment successful:', response);
          try {
            const verifyResponse = await fetch(`${baseURL}/api/orders/razorpay/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (verifyData.message === 'Payment verified successfully') {
              resolve({
                success: true,
                orderId: data.order._id,
              });
            } else {
              console.error('Payment verification failed:', verifyData);
              reject(new Error('Payment verification failed'));
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            reject(error);
          }
        },
        prefill: {
          name: orderData.name,
          email: orderData.email,
          contact: orderData.phone,
        },
        notes: {
          address: `${orderData.address.address}, ${orderData.address.city}, ${orderData.address.state}, ${orderData.address.country}, ${orderData.address.zipcode}`
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: function() {
            reject(new Error('Payment cancelled by user'));
          }
        }
      };

      console.log('Initializing Razorpay with options:', { ...options, key: '[REDACTED]' });
      const rzp = new window.Razorpay(options);
      rzp.open();
    });
  } catch (error) {
    console.error('Razorpay payment initialization failed:', error);
    throw error;
  }
}; 