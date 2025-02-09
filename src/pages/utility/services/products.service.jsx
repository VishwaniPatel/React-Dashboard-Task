import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from "../../../shared/utility/services/axiosBaseQuery.service";

const baseUrl = "http://localhost:3000/"

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: axiosBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    // Get all products
    getProducts: builder.query({
      query: () =>
      ({
        url: "products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    // Add new product
    addProduct: builder.mutation({
      query: (product) => ({
        url: "products",
        method: "POST",
        data: product,
      }),
      invalidatesTags: ["Product"],
    }),
    // Update an existing product
    updateProduct: builder.mutation({
      query: ({id, ...product}) => ({
        url: `products/${id}`,
        method: 'PUT',
        data: product
      }),
      invalidatesTags: ['Product'],
    }),

    // Delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  })
})

export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi;