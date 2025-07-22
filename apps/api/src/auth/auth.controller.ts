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
import { AuthService } from "./auth.service";
import {
  LoginOTPDto,
  SendOtpDto,
  updateDto,
  VerifyOtpDto,
  VerifyTokenDto,
} from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("send-otp")
  async sendOtp(@Body() body: SendOtpDto, @Req() req: Request) {
    return await this.authService.sendLoginOtp(body, req);
  }

  @Post("login-with-otp")
  async loginWithOtp(@Body() body: LoginOTPDto, @Req() req: Request) {
    return await this.authService.loginWithOtp(body, req);
  }

  @Post("verify-otp")
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return await this.authService.verifyOtp(body);
  }


}
