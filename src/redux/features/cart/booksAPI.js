import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/getBaseUrl'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token')
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`)
        }
        return Headers
    }
})

const booksApi = createApi({
    reducerPath: 'bookAPI',
    baseQuery: baseQuery,
    tagTypes: ['Books'],
    // for get request - use query 
    // for post,put,delete request - use mutation
    endpoints: (build) => ({
        // for get request - use query 
        fetchAllBooks: build.query({
            query: () => "/",
            providesTags: ["Books"]
        })
    })
})

console.log("booksApi", booksApi)
export const { useFetchAllBooksQuery } = booksApi;
export default booksApi;