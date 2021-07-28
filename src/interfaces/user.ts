export interface User {
    _id?: string;
    email: string;
    password: string,
    code?: string,   
    role?: string,
    sex?: boolean,
    firstName?: string,
    lastName?: string     
  }