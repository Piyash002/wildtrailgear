import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  _id: string;
  productName: string;
  price: number;
  stockQuantity: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}
const initialState: CartState = {
  items: [],
};
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:
    ({
          addToCart:(state, action:PayloadAction<CartItem>) => {
             const index = state.items.findIndex((item) => item._id === action.payload._id);
      if (index > -1) {
        state.items[index].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      },
      increaseQuantity:(state, action:PayloadAction<string>)=>{
        const item = state.items.find(item=>item._id === action.payload)
        if(item&& item.quantity<item.stockQuantity){
          item.quantity++
        }
      },
      decreaseQuantity:(state, action:PayloadAction<string>)=>{
        const existItem = state.items.find(item=> item._id === action.payload);
        if(existItem&& existItem.quantity>1){
          existItem.quantity --
        }
      },
      removeFromCart:(state, action:PayloadAction<string>)=>{
        state.items = state.items.filter(item=>item._id !==action.payload)
      }
,
      clearCart :(state)=>{
        state.items=[]
      }
    })

})
export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;