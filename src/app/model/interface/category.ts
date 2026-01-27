// src/app/model/interface/category.interface.ts

export interface ICategory {
  _id: string;
  title: string;
  description: string;
  productsCount: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface ICategoryResponse {
  category: ICategory[];
  totalPages: number;
  totalCount: number;
}
