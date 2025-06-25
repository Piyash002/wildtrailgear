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
     deleteProduct : builder.mutation({
        query:({id})=>({
                url:`/products/delete-product/${id}`,
                method:"DELETE",
        }),
        invalidatesTags:["Products"]
     }), 
     getallProduct : builder.query({
        query:()=>({
                url:"/products/get-all-products",
                method:"GET",
        }),
        providesTags:["Products"]
     }),
     getProductDteails : builder.query({
        query:(id)=>({
                url:`/products/get-product_details/${id}`,
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
    })
})
 export  const {useAddProductMutation, useGetallProductQuery, useGetProductDteailsQuery, useGetProductByCategoryQuery, useUpdateProductMutation, useDeleteProductMutation, useDecreaseProductMutation} = productApi