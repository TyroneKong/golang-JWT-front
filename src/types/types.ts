export type Albums = {
  ID: string;
  Title: string;
  Artist: string;
  Price: number;
};

export type Usertype = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type Response<T> = {
  data: T[];
};
