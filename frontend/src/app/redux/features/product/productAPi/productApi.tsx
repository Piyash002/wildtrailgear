/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const  productApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
     addProduct : builder.mutation({
        query:(productPayload)=>({
                url:"/products/create-product",
                method:"POST",
                body: productPayload
        }),
        invalidatesTags:["Products"]
     }),
     submitReview : builder.mutation({
        query:({productId, reviewData})=>({
                url:`/review/add-review/${productId}`,
                method:"POST",
                body:reviewData
        }),
        invalidatesTags:["Products"]
     }),
     updateProduct : builder.mutation({
        query:({formData, id})=>({
                url:`/products/update-product/${id}`,
                method:"PATCH",
                body: formData
        }),
        invalidatesTags:["Products"]
     }), 
     decreaseProduct : builder.mutation({
        query:({quantity, id})=>({
                url:`/products/decrease-product/${id}`,
                method:"PATCH",
                body: {quantity}
        }),
        invalidatesTags:["Products"]
     }), 
     soldProduct : builder.mutation({
        query:({quantity, id})=>({
                url:`/products/soldQuantity/${id}`,
                method:"PATCH",
                body: {quantity}
        }),
        invalidatesTags:["Products"]
     }), 
     deleteProduct : builder.mutation({
        query:({id})=>({
                url:`/products/delete-product/${id}`,
                method:"DELETE",
        }),
        invalidatesTags:["Products"]
     }), 
     getallProduct : builder.query({
        query: (params) => {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : "";
    return {
      url: `/products/get-all-products${queryString}`,
      method: "GET",
   
    };
  },
  providesTags: ["Products"],
     }),
     getProductDteails : builder.query({
        query:(id)=>({
                url:`/products/get-product_details/${id}`,
                 transformResponse: (response:any) => response.data,
                method:"GET",
        }),
        providesTags:["Products"]
     }),
     getProductByCategory : builder.query({
        query:(category)=>({
                url:`/products/get-product_ByCategory?category=${category}`,
                method:"GET",
        }),
        providesTags:["Products"]
     }),
     getSoldProduct : builder.query({
        query:()=>({
                url:`/products/get-soldPQuantity`,
                method:"GET",
        }),
        providesTags:["Products"]
     }),
    })
})
 export  const {useAddProductMutation, useGetallProductQuery, useGetProductDteailsQuery, useGetProductByCategoryQuery, useUpdateProductMutation, useDeleteProductMutation, useDecreaseProductMutation, useSubmitReviewMutation ,useSoldProductMutation, useGetSoldProductQuery} = productApi