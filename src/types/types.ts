export type Albums = {
  ID: string;
  Title: string;
  Artist: string;
  Price: number;
};

export type Usertype = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  username: string;
};

export type Response<T> = {
  data: T[];
};
