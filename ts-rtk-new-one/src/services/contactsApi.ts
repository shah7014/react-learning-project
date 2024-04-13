import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {Contact} from "../models/Conatct";

export const contactsApi = createApi({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/"
    }),
    tagTypes: ["Contact"],
    endpoints: (builder) => ({
        contacts: builder.query<Contact[], void>({
            query: (arg) => "/contacts",
            providesTags: ["Contact"]
        }),
        singleContact: builder.query<Contact, string>({
            query: (id: string) => `/contacts/${id}`,
            providesTags: ['Contact']
        }),
        addContact: builder.mutation<void, Contact>({
            query: (contact) => ({
                url: '/contacts',
                method: 'POST',
                body: contact
            }),
            invalidatesTags: ['Contact']
        }),
        updateContact: builder.mutation<void, Contact>({
            query: ({id, ...rest}) => ({
                url: `/contacts/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ['Contact']
        }),
        deleteContact: builder.mutation<void, string>({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Contact']
        })
    })
})


export const {
    useContactsQuery,
    useSingleContactQuery,
    useAddContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation
} = contactsApi;

