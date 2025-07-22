import { Controller, Get, Param } from "@nestjs/common";
import { CountriesService } from "./countries.service";

@Controller("countries")
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get("countries")
  async getCountries() {
    return this.countriesService.getCountries();
  }

  @Get("states/:country_id")
  async getStates(@Param("country_id") country_id: number) {
    return this.countriesService.getStates(country_id);
  }

  @Get("cities/:state_id")
  async getCities(@Param("state_id") state_id: number) {
    return this.countriesService.getCities(state_id);
  }

  // Get the system configuration model

  @Get("config")
  async getConfig() {
    return this.countriesService.getConfig();
  }


  
}
