import { Injectable, HttpException } from '@nestjs/common';
import {
    CreateConfigurationDto,
    CustomConfigurationDto,
    UpdateDto,
    UpdatePermissionDto
} from './dto/configuration.dto';
import { SystemConfig } from '@xapads/nest/models';
import { AppResponse } from '@xapads/nest/utils';
import { Op } from 'sequelize';

@Injectable()
export class ConfigurationService {

    async create(data: CreateConfigurationDto) {
        const configuration = await SystemConfig.create({
            feature: data.feature,
            sub_feature: data.sub_feature,
            value: data.value,
        });

        return AppResponse.success({
          message: AppResponse.messages.success,
          data: configuration,
        });
    }

    // async update(data: UpdateDto) {
    //     try {
    //         let record = await SystemConfig.findByPk(data.id)
    //         if (record) {
    //             record.feature = data.feature;
    //             record.sub_feature = data.sub_feature;
    //             record.value = data.value;
    //             record.app = data.app;
    //             record.platform = data.platform;
    //             record.country = data.country;

    //             record = await record.save();
    //             return AppResponse.success({
    //                 message: AppResponse.messgaes.recordUpdated,
    //                 data: record
    //             });
    //         } else {
    //             return AppResponse.success({
    //                 message: AppResponse.messgaes.recordNotFound,
    //             });
    //         }
    //     } catch (error) {
    //         return AppResponse.failed({
    //             message: error.message,
    //         });
    //     }
    // }


    // async distroy(id) {

    //     try {
    //         const data = await SystemConfig.findByPk(id)
    //         if (!data) {
    //             return AppResponse.failed({
    //                 message: AppResponse.messgaes.recordNotFound,
    //             });
    //         } else {
    //             await SystemConfig.destroy({
    //                 where: { id: id },
    //             });
    //             return AppResponse.success({
    //                 message: AppResponse.messgaes.recordDeleted,
    //             });
    //         }
    //     } catch (error) {
    //         return AppResponse.failed({
    //             message: error.message,
    //         });
    //     }

    // }

    // async createCustomConfiguration(data: CustomConfigurationDto) {
    //     const configuration = await CustomConfig.create({
    //         country: data.country,
    //         app: data.app,
    //         platform: data.platform,
    //         feature: data.feature,
    //         sub_feature: data.sub_feature,
    //         status: data.status,
    //     });

    //     return AppResponse.success({
    //         message: AppResponse.messgaes.success,
    //         data: configuration,
    //     });
    // }

    // async listing(id: any, req: Request) {

    //     const app = req.headers['x-app'] as string;
    //     const country = req.headers['x-country'] as string;
    //     const platform = req.headers['x-platform'] as string;
    //     if (!app || !platform) {
    //         throw new HttpException(AppResponse.messgaes.missingApp, 400);
    //     }
    //     let query = {
    //         where: {
    //             app: app,
    //             platform: platform,
    //             is_active:true
    //         },
    //     };
    //     if (id) {
    //         query.where['feature'] = id;
    //     }
    //     // If country is not provided or is "all", find records with null or empty country
    //     query.where['country'] = {
    //         [Op.or]: [
    //             { [Op.eq]: null },
    //             { [Op.eq]: '' }
    //         ]
    //     };
    //     if (country && country.toUpperCase() !== 'ALL') {
    //         query.where['country'] = {
    //             [Op.or]: [
    //                 { [Op.eq]: null },
    //                 { [Op.eq]: '' },
    //                 { [Op.eq]: country.toUpperCase() },
    //             ]
    //         };
    //     }
    //     let appConfig = await SystemConfig.findAll(query)
    //     // let customConfig = await CustomConfig.findAll(query)

    //     // let filteredArr = appConfig.filter(item => {
    //     //     let matchingItem = customConfig.find(newItem =>
    //     //         newItem.feature === item.feature && newItem.sub_feature === item.sub_feature
    //     //     );
    //     //     return matchingItem && matchingItem.status === true;
    //     // });

    //     const resultObject = appConfig.reduce((acc, item) => {
    //         const { feature, sub_feature, value } = item;
    //         if (!acc[feature]) {
    //             acc[feature] = {};
    //         }
    //         if (!sub_feature) {
    //             acc[feature] = value;
    //         } else {
    //             acc[feature][sub_feature] = value;
    //         }
    //         return acc;
    //     }, {});

    //     for (const key in resultObject) {
    //         if (resultObject[key].hasOwnProperty('default')) {
    //             if (Array.isArray(resultObject[key].default)) {
    //                 resultObject[key] = Object.values(resultObject[key].default);
    //             } else if (typeof resultObject[key] === 'object') {
    //                 Object.assign(resultObject[key], resultObject[key].default);
    //             }
    //             delete resultObject[key].default;
    //         }
    //     }


    //     return AppResponse.success({
    //         message: AppResponse.messgaes.success,
    //         data: resultObject,
    //     });
    // }

    // async updatePermission(data: UpdatePermissionDto) {
    //     try {
    //         let record = await CustomConfig.findByPk(data.id)
    //         if (record) {
    //             record.status = data.status;
    //             record = await record.save();
    //             return AppResponse.success({
    //                 message: AppResponse.messgaes.recordUpdated,
    //                 data: record
    //             });
    //         } else {
    //             return AppResponse.success({
    //                 message: AppResponse.messgaes.recordNotFound,
    //             });
    //         }
    //     } catch (error) {
    //         return AppResponse.failed({
    //             message: error.message,
    //         });
    //     }
    // }
}
