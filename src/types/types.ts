export type Albums = {
  ID: string;
  Title: string;
  Artist: string;
  Price: number;
};

export type Products = {
  id: number;
  name: string;
  serial_number: string;
};

export type Usertype = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type Order = {
  id: number;
  product_id: number;
  Product: Products;
  user_id: number;
  User: Usertype;
};

export type Response<T> = {
  data: T[];
};
