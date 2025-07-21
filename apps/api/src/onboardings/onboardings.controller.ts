import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Query,
  Put,
  UseGuards,
} from "@nestjs/common";
import { OnboardingService } from "./onboardings.service";
import { OnboardingDto } from "./dto/onboardings.dto";
import { JwtAuthGuard } from "@xapads/nest/modules";

@Controller("onboardings")
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

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
    return await this.onboardingService.listing({
      skip,
      limit,
      sort,
      ord,
    });
  }

  @Get("/:id")
  @UseGuards(JwtAuthGuard)
  async show(@Param("id") id: string) {
    return await this.onboardingService.show(id);
  }

  @Put("/:id")
  @UseGuards(JwtAuthGuard)
  async update(@Param("id") id: string, @Body() updatedData: OnboardingDto) {
    return await this.onboardingService.update(id, updatedData);
  }
}
