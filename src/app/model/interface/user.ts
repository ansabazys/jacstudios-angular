export interface IUser {
  _id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';

  address?: IUserAddress; // optional because it may be empty

  createdAt: string;
  updatedAt: string;
}

export interface IUserAddress {
  fullName: string;
  phoneNumber: number;
  city: string;
  state: string;
  postalCode: string;
  addressLine: string;
}
