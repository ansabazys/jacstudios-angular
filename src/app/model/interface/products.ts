export interface ISize {
  size: string;       // e.g., "S", "M", "L", "XL"
  stock: number;   // how many in stock
  _id: string
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  categoryId: string;
  stockStatus: string;      // e.g., "out of stock"
  sizes: ISize[];
  reviews: any[];           // can define a separate interface for reviews if needed
  isDeleted: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface IProductApiResponse {
  products: IProduct[];
  totalPages: number;
  totalCount: number;
}
