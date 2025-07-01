"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = exports.CodPaymet = void 0;
const BillingAddress_1 = require("../model/BillingAddress");
const CodPaymet = async (datas) => {
    const mappedCartItems = datas.cartItems.map((item) => ({
        productId: item._id,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
    }));
    const data = datas?.shippingData;
    const result = new BillingAddress_1.BillingAddress({
        name: data.name,
        address: data.address,
        email: data.email,
        zila: data.zila,
        upozila: data.upozila,
        phone: data.phone,
        postcode: data.postcode,
        paymentMethod: "COD",
        isPaid: false,
        cartItems: mappedCartItems
    });
    await result.save();
    return result;
};
exports.CodPaymet = CodPaymet;
const GetStatus = async () => {
    const result = BillingAddress_1.BillingAddress.find();
};
exports.paymentService = {
    CodPaymet: exports.CodPaymet,
    GetStatus
};
