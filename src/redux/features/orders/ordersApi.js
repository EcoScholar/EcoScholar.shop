import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

// Create the base query with proper configuration
const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    }
});

// Create a custom base query with logging
const baseQueryWithLogging = async (args, api, extraOptions) => {
    // Ensure method is always set
    const request = {
        ...args,
        method: args.method || 'GET'
    };

    console.log('Making request:', {
        url: request.url,
        method: request.method,
        body: request.body
    });
    
    try {
        const result = await baseQuery(request, api, extraOptions);
        
        console.log('Request result:', {
            data: result.data,
            error: result.error,
            meta: result.meta
        });
        
        return result;
    } catch (error) {
        console.error('Request failed:', error);
        return { error };
    }
};

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: baseQueryWithLogging,
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder
            }),
            invalidatesTags: ['Orders']
        }),
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`,
                method: 'GET'
            }),
            providesTags: ['Orders']
        }),
        cancelOrder: builder.mutation({
            query: (orderId) => {
                console.log('Cancelling order:', orderId);
                return {
                    url: `/cancel/${orderId}`,
                    method: 'PATCH',
                    // Add empty body to ensure proper request formatting
                    body: {}
                };
            },
            // Add error handling
            async onQueryStarted(orderId, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log('Order cancelled successfully:', data);
                } catch (error) {
                    console.error('Error cancelling order:', {
                        error: error?.error,
                        message: error?.message
                    });
                }
            },
            invalidatesTags: ['Orders']
        })
    })
});

export const {
    useCreateOrderMutation,
    useGetOrderByEmailQuery,
    useCancelOrderMutation
} = ordersApi;

export default ordersApi;