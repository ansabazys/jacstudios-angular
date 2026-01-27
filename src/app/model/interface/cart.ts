// Cart API response interface

export interface ICartItem {
  _id: string;
  productId: {
    _id: string;
    title: string;
    images: string[];
    price: number;
    sizes: { size: string; stock: number }[];
    [key: string]: any; // optional extra fields
  };
  productName: string;
  quantity: number;
  selectedSize: string;
}

export interface ICartResponse {
  _id: string;
  userId: string;
  items: ICartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
