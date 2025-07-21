import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Patch,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import { PaymentService } from "./payments.service";
import { PaymentDto } from "./dto/payments.dto";
import { JwtAuthGuard } from "@xapads/nest/modules";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get("/")
  async listing(
    @Query("skip") skip: number = 1,
    @Query("limit") limit: number = 50,
    @Query("sort") sort: string = "experience",
    @Query("ord") ord: "asc" | "desc" = "asc"
  ) {
    limit = limit ? Number(limit) : 50;
    skip = skip ? (Number(skip) - 1) * limit : 0;
    return await this.paymentService.listing({
      skip,
      limit,
      sort,
      ord,
    });
  }

  @Get("/:id")
  //@UseGuards(JwtAuthGuard)
  async show(@Param("id") id: string) {
    console.log("gettttttt controller");
    return await this.paymentService.show(id);
  }

  @Post("/")
  @UseGuards(JwtAuthGuard)
  async create(@Param("id") id: string, @Body() postData: PaymentDto) {
    return await this.paymentService.create(postData);
  }

@Patch("update-balance/:userId")
@UseGuards(JwtAuthGuard)
async updateBalance(
  @Param("userId") userId: string, // ✅ change to string
  @Body("amount") deductedAmount: number
) {
  return this.paymentService.updateBalance(userId, deductedAmount);
}


@Get(':userId/transactions')
@UseGuards(JwtAuthGuard)
async walletTransaction(
  @Param("userId") userId: string,
) {
  return this.paymentService.walletTransaction(userId);
}



@Get(':userId/astrologer/transactions')
@UseGuards(JwtAuthGuard)
async astrologerWalletTransaction(
  @Param("userId") userId: string,
) {
  return this.paymentService.astrologerWalletTransaction(userId);
}




  


  // @Get("/showListing")
  // async astrologerListing() {
  //   console.log("gettttttt listing");
  //   return await this.vendorService.astrologerListing();
  // }
}
