import { baseApi } from "../../api/baseApi";
export const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
         login:builder.mutation({
            query:(body)=>({
                url:"/auth/login-user",
                method:"POST",
                body
            }),
            invalidatesTags:["Users"]
        }),
        register:builder.mutation({
            query:(body)=>({
                url:"/auth/register-user",
                method:"POST",
                body,
                
            }),
            invalidatesTags:["Users"]
        }),
           getSingleUser: builder.query({
            query: (id) => `/me/${id}`,
             providesTags:["Users"]
        }),
           getAllUser: builder.query({
            query: () => `/admin/get_all_user`,
            providesTags:["Users"]
        }),
           updateUserRole: builder.mutation({
            query: ({role, id}) =>({
            url:`/admin/update_user_role/${id}`,
            method:"PATCH",
            body:{role}
            }),
            invalidatesTags: ["Users"],
        }),
           deleteUser: builder.mutation({
            query: ({id}) =>({
            url:`/admin/delete_user/${id}`,
            method:"DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    })
})
export const {useLoginMutation,useRegisterMutation, useGetSingleUserQuery, useGetAllUserQuery, useUpdateUserRoleMutation,useDeleteUserMutation} = authApi;