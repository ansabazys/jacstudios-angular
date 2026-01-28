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

interface IOrderUser {
  _id: string;
  email: string;
  name: string;
}

export interface IOrderResponse {
  _id: string;
  userId: string | IOrderUser;
  items: ICartItem[];
  address: IAddress;
  totalAmount: number;
  orderStatus: 'pending' | 'completed' | 'canceled' | 'returned';
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IOrdersResponse {
  orders: IOrderResponse[];
  totalPages: number;
  ordersCount: number;
}
