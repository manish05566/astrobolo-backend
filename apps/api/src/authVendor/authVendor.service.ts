import { forwardRef, HttpException, Inject, Injectable } from "@nestjs/common";
import {
  LoginOTPDto,
  SendOtpDto,
  updateDto,
  VerifyOtpDto,
  VerifyTokenDto,
} from "./dto/authVendor.dto";
import { JwtService } from "@nestjs/jwt";
import moment from "moment";
import * as crypto from "crypto";
import { ConfigService } from "@nestjs/config";
import { AppResponse } from "@xapads/nest/utils";
import { OtpTypeEnum } from "@xapads/constant";
import {
  Vendor,
  Otp,
} from "@xapads/nest/models";

import { LoggerService } from "@xapads/nest/modules";
import { Op } from "sequelize";
@Injectable()
export class AuthVendorService {
  constructor(
    @Inject(forwardRef(() => JwtService)) private readonly jwt: JwtService,
    private config: ConfigService,

    private loggerService: LoggerService
  ) {}

  private getAccessTokens(user: Vendor) {
      const secret = crypto.randomBytes(164).toString("base64");
      const payload: any = {
        user: {
          id: user.id,
          first_name: user.first_name,
          mobile: user.mobile,
        },
        secret,
      };
      const token: string = this.jwt.sign(payload);
      const refreshToken: string = this.jwt.sign(payload, {
        expiresIn: this.config.get("JWT_REFRESH_EXPIRY"),
      });
  
      return {
        token,
        refreshToken,
        user: {
          id: user.id,
          name: user.first_name,
          mobile: user.mobile,
          login: user.is_login,
        },
      };
    }

  async sendLoginOtp(data: SendOtpDto, req: Request) {
    try {
      const getOtp = await this.sendOTP(data.mobile, OtpTypeEnum.LOGIN, req);
      return AppResponse.success({
        message: AppResponse.messages.auth.otpSend,
        data: getOtp,
      });
    } catch (error) {
      const loggingEnabled = this.config.get("ENABLE_LOGGER", false);
      if (loggingEnabled === "true") {
        const stack = new Error().stack;
        this.loggerService.error(error.message, stack, req);
      }
      return AppResponse.failed({
        message: error.message,
      });
    }
  }

  async sendOTP(mobile: string, otpType: OtpTypeEnum, req: Request) {
    const { ip } = req as any;
    const ua = req.headers["user-agent"];

    let otp: any = await Otp.findOne({
      where: { mobile, type: otpType },
    });

    //Handling the otp attempts
    if (otp) {
      const currentTime = moment();
      const coolDownPeriod = 30;
      const attemptsLimit = 3;
      const isCoolDownActive =
        otp.updatedAt &&
        currentTime.diff(otp.updatedAt, "minutes") < coolDownPeriod;

      if (otp.attempts >= attemptsLimit && isCoolDownActive) {
        const minutesSinceLastOtp = currentTime.diff(otp.updatedAt, "minutes");
        const remainingMinutes = coolDownPeriod - minutesSinceLastOtp;
        const minuteText = remainingMinutes === 1 ? "minute" : "minutes";
        throw new Error(
          `${AppResponse.messages.auth.maxReach} You can try again in ${remainingMinutes} ${minuteText}.`
        );
      }

      if (otp.attempts >= attemptsLimit && !isCoolDownActive) {
        await Otp.destroy({ where: { mobile, type: otpType } });
        otp = null;
      }
    }

    const otpValue = Math.floor(1000 + Math.random() * 9000).toString();
    const ttlDate = moment().add(10, "minutes");
    if (otp) {
      otp.otp = otpValue;
      otp.attempts += 1;
      otp.ttl = ttlDate;
      otp.ua = ua;
      otp.ip = ip;
      await otp.save();
    } else {
      otp = await Otp.create({
        mobile,
        ua,
        ip,
        ttl: ttlDate,
        type: otpType,
        otp: otpValue,
        attempts: 1,
      });
    }

    // Send OTP mobile
    // await this.mailerService.sendOtpmobile(mobile, {
    //   otp: otpValue,
    // });

    return otp;
  }

  async loginWithOtp(data: LoginOTPDto, req: Request) {
    try {
      const otpVerification = await this.verifyOtp({
        mobile: data.mobile,
        otp: data.otp,
        otpType: OtpTypeEnum.LOGIN,
      });

      if (!otpVerification.status) {
        return AppResponse.failed({
          message: otpVerification.message,
        });
      }
      let mobileExists = await Vendor.findOne({
        where: { mobile: data.mobile },
      });

      if (mobileExists) {
        mobileExists.mobile = data.mobile;
        mobileExists.is_login = true;
        mobileExists.is_active = true;
        mobileExists = await mobileExists.save();
      } else {
        mobileExists = await Vendor.create({
          mobile: data.mobile,
          is_login: true,
          is_active: true,
        });
      }
      const tokenData = { ...this.getAccessTokens(mobileExists) };
      if (Object.keys(tokenData).length > 0) {
        await Otp.destroy({
          where: { mobile: data.mobile, type: OtpTypeEnum.LOGIN },
        });
      }
      return AppResponse.success({
        message: AppResponse.messages.success,
        data: { ...this.getAccessTokens(mobileExists) },
      });
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
      });
    }
  }

  async verifyOtp(data: VerifyOtpDto) {
    try {
      const otp = await Otp.findOne({
        where: {
          mobile: data.mobile,
          otp: data.otp,
          type: data.otpType,
        },
      });

      if (!otp)
        return AppResponse.failed({
          message: AppResponse.messages.auth.otpInvalid,
        });
      if (moment(otp.ttl).isBefore(moment()))
        return AppResponse.failed({
          message: AppResponse.messages.auth.otpExpired,
        });
      return AppResponse.success({});
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
      });
    }
  }
}
