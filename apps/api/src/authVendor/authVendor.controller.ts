import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  UseGuards,
  Headers,
  Put,
} from "@nestjs/common";
import { AuthVendorService } from "./authVendor.service";
import {
  LoginOTPDto,
  SendOtpDto,
  updateDto,
  VerifyOtpDto,
  VerifyTokenDto,
} from "./dto/authVendor.dto";
import { JwtAuthGuard } from "@xapads/nest/modules";

@Controller("authVendor")
export class AuthVendorController {
  constructor(private readonly authVendorService: AuthVendorService) {}

  @Post("send-otp")
  async sendOtp(@Body() body: SendOtpDto, @Req() req: Request) {
    return await this.authVendorService.sendLoginOtp(body, req);
  }

  @Post("login-with-otp")
  async loginWithOtp(@Body() body: LoginOTPDto, @Req() req: Request) {
    return await this.authVendorService.loginWithOtp(body, req);
  }

  @Post("verify-otp")
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return await this.authVendorService.verifyOtp(body);
  }

 
}
