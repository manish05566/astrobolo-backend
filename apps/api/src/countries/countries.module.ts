import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { CountriesService } from "./countries.service";
import { CountriesController } from "./countries.controller";
import { Country, State, City } from "@xapads/nest/models";

@Module({
  imports: [SequelizeModule.forFeature([Country, State, City])],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
