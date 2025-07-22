import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import moment = require("moment");
import { Country } from "@xapads/nest/models";
import { State } from "@xapads/nest/models";
import { City } from "@xapads/nest/models";
import { SystemConfig } from "@xapads/nest/models";

import { AppResponse, checkHash, toHash } from "@xapads/nest/utils";

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country) private countryModel: typeof Country,
    @InjectModel(State) private stateModel: typeof State,
    @InjectModel(City) private cityModel: typeof City
  ) {}

  async getCountries() {
    try {
      const countriesList = await Country.findAll({ attributes: ["id","name"] });

      if (countriesList && countriesList.length > 0) {
        return AppResponse.success({
          message: AppResponse.messages.recordFound,
          data: countriesList,
        });
      } else {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: [],
        });
      }
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: [],
      });
    }
  }

  async getStates(country_id: number) {
    try {
      const statesList = await State.findAll({
        where: { country_id },
        attributes: ["id", "name"],
      });

      if (statesList && statesList.length > 0) {
        return AppResponse.success({
          message: AppResponse.messages.recordFound,
          data: statesList,
        });
      } else {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: [],
        });
      }
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: [],
      });
    }
  }

  async getCities(state_id: number) {
    try {
      const citiesList = await City.findAll({
        where: { state_id },
        attributes: ["id", "name"],
      });

      if (citiesList && citiesList.length > 0) {
        return AppResponse.success({
          message: AppResponse.messages.recordFound,
          data: citiesList,
        });
      } else {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: [],
        });
      }
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: [],
      });
    }
  }

  // Get the business logic to fetch the system config

  async getConfig() {
    try {
      const configList = await SystemConfig.findAll();

      if (!configList || configList.length === 0) {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: [],
        });
      }

      const grouped: Record<string, Record<string, string>> = {};

      configList.forEach((item: any) => {
        try {
          grouped[item.feature] = JSON.parse(item.value);
        } catch (err) {
          grouped[item.feature] = {};
        }
      });

      return AppResponse.success({
        message: AppResponse.messages.recordFound,
        data: grouped,
      });
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: [],
      });
    }
  }
}
