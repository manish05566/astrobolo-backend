import { Module } from '@nestjs/common';
import { VendorService } from './vendors.service';
import { VendorController } from './vendors.controller';

@Module({
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
