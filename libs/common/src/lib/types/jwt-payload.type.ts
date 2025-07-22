import { Gender } from './gender.enum';

export type PayloadPublication = {
  id: string;
  name: string;
  avatar: string;
  country: string;
  link: string;
  role: string;
  isDefault: boolean;
};

export type PayloadUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  avatar: string;
  isEmailVerified: boolean;
  publications: Array<PayloadPublication>;
  defaultPublication: PayloadPublication;
};

export type JwtPayload = {
  user: PayloadUser;
  ip: string;
  ua: string;
};
