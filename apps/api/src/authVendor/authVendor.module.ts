import { Module } from "@nestjs/common";
import { AuthVendorService } from "./authVendor.service";
import { AuthVendorController } from "./authVendor.controller";

@Module({
  controllers: [AuthVendorController],
  providers: [AuthVendorService],
})
export class AuthVendorModule {}
