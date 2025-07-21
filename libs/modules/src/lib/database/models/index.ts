export * from "./otp.model";
export * from "./user.model";
export * from "./onboardings.model";
export * from "./age.model";
export * from "./systemconfig.model";
export * from "./country.model";
export * from "./state.model";
export * from "./city.model";
export * from "./vendor.model";
export * from "./recharge-payment.model";

export * from "./chat.model";
export * from "./chat_transactions.model";



import { Otp } from "./otp.model";
import { User } from "./user.model";
import { Onboardings } from "./onboardings.model";
import { AgeGroup } from "./age.model";
import { SystemConfig } from "./systemconfig.model";
import { Vendor } from "./vendor.model";
import { RechargePayment } from "./recharge-payment.model";
import { ChatTransaction } from "./chat_transactions.model";
import { Chat } from "./chat.model";

import { Country } from "./country.model";
import { State } from "./state.model";
import { City } from "./city.model";

export const models = [
  User,
  Otp,
  Onboardings,
  AgeGroup,
  SystemConfig,
  Country,
  State,
  City,
  Vendor,
  RechargePayment,
  ChatTransaction,
  Chat
];
