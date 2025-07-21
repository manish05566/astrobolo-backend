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
  UseGuards,
} from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import { UserService } from "./users.service";
import { UserDto, UploadProfileDto } from "./dto/users.dto";
import { JwtAuthGuard } from "@xapads/nest/modules";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/")
  @UseGuards(JwtAuthGuard)
  async listing(
    @Query("skip") skip: number = 1,
    @Query("limit") limit: number = 50,
    @Query("sort") sort: string = "position",
    @Query("ord") ord: "asc" | "desc" = "asc"
  ) {
    limit = limit ? Number(limit) : 50;
    skip = skip ? (Number(skip) - 1) * limit : 0;
    return await this.userService.listing({
      skip,
      limit,
      sort,
      ord,
    });
  }

  @Get("/:id")
  @UseGuards(JwtAuthGuard)
  async show(@Param("id") id: string) {
    return await this.userService.show(id);
  }

  @Put("/:id")
  @UseGuards(JwtAuthGuard)
  async update(@Param("id") id: string, @Body() updatedData: UserDto) {
    return await this.userService.update(id, updatedData);
  }

  // Upload image file

  // @Put("/upload-profile/:id")
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor("file"))
  // async uploadProfile(
  //   @Param("id") userid: string,
  //   @UploadedFile() file: Express.Multer.File
  // ) {
  //   if (!file) {
  //     throw new BadRequestException("File should not be empty");
  //   }

  //   const payload = { userid, file };

  //   return await this.userService.uploadProfile(payload);
  // }

  @Put("/upload-profile/:id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image")) // <-- must match the key in formData
  async uploadProfile(
    @Param("id") userid: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log('come herererer request',file);
    if (!file) {
      throw new BadRequestException("File should not be empty");
    }

    const payload = { userid, file };

    return await this.userService.uploadProfile(payload);
  }
}
