import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
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
import { VendorService } from "./vendors.service";
import { VendorDto, UploadProfileDto } from "./dto/vendors.dto";
import { JwtAuthGuard } from "@xapads/nest/modules";

@Controller("vendors")
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get("/")
  async listing(
    @Query("skip") skip: number = 1,
    @Query("limit") limit: number = 50,
    @Query("sort") sort: string = "experience",
    @Query("ord") ord: "asc" | "desc" = "asc"
  ) {
    limit = limit ? Number(limit) : 50;
    skip = skip ? (Number(skip) - 1) * limit : 0;
    return await this.vendorService.listing({
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
    return await this.vendorService.show(id);
  }

  @Put("/:id")
  @UseGuards(JwtAuthGuard)
  async update(@Param("id") id: string, @Body() updatedData: VendorDto) {
    console.log("jkjkjkjkjkjkjkjkj controller");
    return await this.vendorService.update(id, updatedData);
  }

  // Upload image file

  @Put("/upload-profile/:id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image")) // <-- must match the key in formData
  async uploadProfile(
    @Param("id") userid: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log("come herererer request", file);
    if (!file) {
      throw new BadRequestException("File should not be empty");
    }

    const payload = { userid, file };

    return await this.vendorService.uploadProfile(payload);
  }

  @Put("/upload-documents/:id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "document1", maxCount: 1 },
      { name: "document2", maxCount: 1 },
    ])
  )
  async uploadDocuments(
    @Param("id") userid: string,
    @UploadedFiles()
    files: {
      document1?: Express.Multer.File[];
      document2?: Express.Multer.File[];
    }
  ) {
    if (!files.document1?.length || !files.document2?.length) {
      throw new BadRequestException(
        "Both Aadhar (document1) and PAN (document2) are required."
      );
    }

    return await this.vendorService.uploadDocuments(userid, [
      files.document1[0],
      files.document2[0],
    ]);
  }

  // @Get("/showListing")
  // async astrologerListing() {
  //   console.log("gettttttt listing");
  //   return await this.vendorService.astrologerListing();
  // }
}
