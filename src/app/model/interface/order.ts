export interface IAddress {
  fullName: string;
  phoneNumber: string | number;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface ICartItem {
  _id: string;
  productId: string; // Can be a populated object if needed
  productName: string;
  quantity: number;
  selectedSize: string;
  price: number;
}

export interface IOrderResponse {
  _id: string;
  userId: string;
  items: ICartItem[];
  address: IAddress;
  totalAmount: number;
  orderStatus: 'pending' | 'Delivered' | 'canceled';
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}