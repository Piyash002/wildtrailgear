export interface Tuser {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  password: string;
  phone: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface TShippingAdress {
  name: string;
  email: string;
  address: string;
  zila:string;
  upozila:string;
  postcode:string;
  phone: number;
  paymentMethod: "stripe" | "cod";
}

export interface Tcategory {
  message: string;
  success: boolean;
  _id: string;
  categoryName: string;
  image?: string; // Optional field for category image
};

export interface Tproduct {
  _id:string;
  productName: string;
  price: number;
  description: string;
  category: string;
  stockQuantity: number;
  images: { url: string; isMain: boolean }[];
}
export interface TCartItem {
  _id: string;
  productName: string;
  price: number;   
  image: string;       
  stockQuantity: number; 
  quantity:number;
}
