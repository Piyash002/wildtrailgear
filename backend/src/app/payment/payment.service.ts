import { BillingAddress } from "../model/BillingAddress";

export const CodPaymet = async(datas:any)=>{

 const mappedCartItems = datas.cartItems.map((item: any) => ({
      productId: item._id, 
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
    }));
    const data = datas?.shippingData
    const result = new BillingAddress({
        name:data.name,
        address:data.address,
        email:data.email,
        zila:data.zila,
        upozila:data.upozila,
        phone:data.phone,
        postcode:data.postcode,
        paymentMethod: "COD",
        isPaid: false,
        cartItems:mappedCartItems
    })
     await result.save()
    return result

}
const GetStatus = async()=>{
    const result = BillingAddress.find()
    
}
export const paymentService = {
CodPaymet,
GetStatus
}