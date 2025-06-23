import type { Tcategory } from "../../../../types/types";
import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       getCategories: builder.query<{ success: boolean; data: Tcategory[] }, void>({
  query: () => ({
    url: "/categories",
    method: "GET",
  }),
  providesTags: ["Categories"],
})
,
        getCategoryById: builder.query({
            query: (id) => `/categories/${id}`,
             providesTags: ['Categories'], // Matches the invalidation
        }),
        createCategory: builder.mutation<Tcategory, FormData>({
            query: (formData: FormData) => ({
                url: "/categories/create-category",
                method: "POST",
                body: formData, // must be FormData
            }),
             invalidatesTags: ["Categories"], // ✅ Add this line
        }),
        updateCategory: builder.mutation<Tcategory, { formData: FormData; id: string }>({
            query: ({ formData, id }) => ({
                url: `/categories/update-category/${id}`,
                method: "PATCH",
                body: formData, // must be FormData
            }),
            invalidatesTags: ["Categories"]
        }),
        deletecategory:builder.mutation<{ success: boolean; id: string }, string>({
            query: (id: string) => ({
                url: `/categories/delete-category/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Categories"]
        })
          
    }),
    overrideExisting: false,
})

export const  {useGetCategoriesQuery,useGetCategoryByIdQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeletecategoryMutation} =  categoryApi;
