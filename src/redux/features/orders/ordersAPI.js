import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/getBaseUrl'

const ordersApi = createApi({
    reducerPath: 'ordersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include',
    }),
    tagTypes: ['Orders'],
    // for get request - use query 
    // for post,put,delete request - use mutation
    endpoints: (builder) => ({
        //creating a order
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder
            }),
            invalidatesTags: ["Orders"]
        }),
    })
})


export const { useCreateOrderMutation } = ordersApi;
export default ordersApi;