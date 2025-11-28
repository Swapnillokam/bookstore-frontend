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
    baseQuery,
    tagTypes: ['Books'],
    // for get request - use query 
    // for post,put,delete request - use mutation
    endpoints: (builder) => ({
        // for get request - use query 
        //getting all books
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        //getting books by id
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Books", id }]
        }),
        //posting book by id 
        addBook: builder.mutation({
            query: (newBook) => ({
                url: '/create-book',
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]//i.e refreshing/validating the newBook in getAllBooks api or if yppu dont include line you have to refresh teh browser to include the data
        }),
        //editing the book by id
        updateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]//i.e refreshing/validating the newBook in getAllBooks api or if yppu dont include line you have to refresh teh browser to include the data
        }),
        //deleteing the book by id
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"]//i.e refreshing/validating the newBook in getAllBooks api or if yppu dont include line you have to refresh teh browser to include the data
        }),

    })
})


export const { useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation } = booksApi;
export default booksApi;