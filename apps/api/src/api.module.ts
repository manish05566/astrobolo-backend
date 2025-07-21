import { Module, ValidationPipe } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";

import {
  DatabaseModule,
  ConfigModule,
  JwtModule,
  LoggerModule,
  CacheModule,
} from "@xapads/nest/modules";

import { ConfigService } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core/constants";
import { OnboardingModule } from "./onboardings/onboardings.module";
import { UserModule } from "./users/users.module";
import { VendorModule } from "./vendors/vendors.module";
import { PaymentModule } from "./payment/payments.module";
import { ChatModule } from "./chats/chats.module";
import { AuthModule } from "./auth/auth.module";
import { AuthVendorModule } from "./authVendor/authVendor.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { CountriesModule } from "./countries/countries.module";


@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    JwtModule,
    DatabaseModule,
    AuthModule,
    AuthVendorModule,
    UserModule,
    VendorModule,
    PaymentModule,
    ConfigurationModule,
    ChatModule,
    CacheModule,
    OnboardingModule,
    CountriesModule,
    ServeStaticModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return [
          {
            rootPath: config.get("uploadPath") || "",
            serveRoot: "/static",
          },
        ];
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: false,
        },
      }),
    },
  ],
})
export class ApiModule {}
