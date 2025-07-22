import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { createNamespace } from "cls-hooked";

import { models } from "./models";

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        // Setting up a Global Transaction namespace for Sequelize
        Sequelize.useCLS(createNamespace("pbBloxTransaction"));

        return {
          dialect: "mysql",
          name: "astrobolo",
          host: config.get("dbHost") || "localhost",
          port: config.get("dbPort") || 3306,
          username: config.get("dbUser") || "mysql",
          password: config.get("dbPassword") || "",
          database: config.get("dbName") || "astrobolo",
          autoLoadModels: true,
          models,
          logging: console.log,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
