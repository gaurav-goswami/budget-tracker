import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath : 'userApi',
    baseQuery : fetchBaseQuery({
        baseUrl : 'http://localhost:8080/api/v1/user'
    }),

    endpoints : (builder) => ({

        // register user

        postUser : (builder).mutation({
            query : (data) => ({
                url : '/new',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            })
        }),

        // login

        loginUser : (builder).mutation({
            query : (data) => ({
                url : '/login',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : 'include',
                body : JSON.stringify(data)
            })
        }),

    })
})

export const {usePostUserMutation, useLoginUserMutation ,useLogoutUserQuery} = userApi;