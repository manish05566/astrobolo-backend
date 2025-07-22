import { Injectable } from "@nestjs/common";
import { OnboardingDto } from "./dto/onboardings.dto";
import moment = require("moment");
import { Onboardings } from "@xapads/nest/models";
import { AppResponse, checkHash, toHash } from "@xapads/nest/utils";

@Injectable()
export class OnboardingService {
  async listing(filters: {
    skip: number;
    limit: number;
    sort: string;
    ord: "asc" | "desc";
  }) {
    try {
      const { skip, limit, sort, ord } = filters;
      const whereCondition: any = {};

      whereCondition.is_active = true;

      const onboardingList = await Onboardings.findAll({
        offset: skip,
        limit,
        order: [[sort, ord]],
        where: whereCondition,
        attributes: {
          exclude: ["createdAt", "updatedAt", "is_active", "position"],
        },
      });

      if (onboardingList && onboardingList.length > 0) {
        return AppResponse.success({
          message: AppResponse.messages.recordFound,
          data: onboardingList,
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

  async show(id: string) {
    try {
      const whereCondition: any = {};
      const onboardingsId = await Onboardings.findByPk(id);
      if (!onboardingsId) {
        return AppResponse.failed({
          message: AppResponse.messages.idNotFound,
          data: {},
        });
      }
      if (id) {
        whereCondition.id = id;
      }

      const onboardingsSpecific = await Onboardings.findOne({
        where: whereCondition,
        attributes: {
          exclude: ["createdAt", "updatedAt", "position"],
        },
      });

      if (!onboardingsSpecific) {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: {},
        });
      }

      return AppResponse.success({
        message: AppResponse.messages.recordFound,
        data: onboardingsSpecific,
      });
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: {},
      });
    }
  }

  async update(id: string, updatedData: OnboardingDto) {
    try {
      const onboarding = await Onboardings.findByPk(id);

      if (!onboarding) {
        return AppResponse.failed({
          message: AppResponse.messages.idNotFound,
          data: {},
        });
      }
      await onboarding.update(updatedData);
      const updatedOnboarding = await Onboardings.findByPk(onboarding.id, {
        attributes: {
          exclude: ["createdAt", "updatedAt", "position"],
        },
      });

      return AppResponse.success({
        message: AppResponse.messages.recordUpdated,
        data: updatedOnboarding,
      });
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: {},
      });
    }
  }
}
