import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TransactionApi = createApi({
    reducerPath : 'transactionApi',
    baseQuery : fetchBaseQuery({
        baseUrl : 'http://localhost:8080/api/v1/transaction'
    }),

    tagTypes : ['transactions'],

    endpoints : (builder) => ({
        
        // all transactions

        getAllTransactions : (builder).query({
            query : () => ({
                url : '/all',
                method : 'GET',
                credentials : 'include',
            }),
            providesTags : ['transactions']

            // for queries => providesTags for mutation => invalidateTags
        }),

        // latest transactions

        getLatestTransactions : (builder).query({
            query: () => ({
                url : '/latest-transactions',
                method : 'GET',
                credentials : 'include'
            }),
            providesTags : ['transactions']
        }),

        // selected transactions

        getSelectedTransaction : (builder).query({
            query : ({transactionType , transactionCategory, transactionDuration}) => ({
                url : `/${transactionType}/${transactionCategory}/${transactionDuration}`,
                method : 'GET',
                credentials : 'include',
            }),
            providesTags : ['transactions']
        }),

        // create transaction

        addTransaction : (builder).mutation({
            query : (transaction_details) => ({
                url : '/new-transaction',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : 'include',
                body : transaction_details
            }),
            invalidatesTags : ['transactions']
        }),

        // update transaction

        updateTransaction : (builder).mutation({
            query: ({transactionId, ...transactionDetails}) => ({
                
                url : `/update/${transactionId}`,
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                credentials : 'include',
                body : transactionDetails,
            }),
            invalidatesTags : ['transactions']

        }),

        // delete transaction

        deleteTransaction : (builder).mutation({
            query: (transaction_id) => ({
                url : `/${transaction_id}`,
                method : 'DELETE',
                credentials : 'include',
            }),
            invalidatesTags : ['transactions']
        })

    })
})


export const {useGetAllTransactionsQuery, useGetLatestTransactionsQuery ,useGetSelectedTransactionQuery, useAddTransactionMutation, useUpdateTransactionMutation, useDeleteTransactionMutation} = TransactionApi;