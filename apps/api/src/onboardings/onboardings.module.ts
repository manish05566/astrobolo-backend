import { Module } from '@nestjs/common';
import { OnboardingService } from './onboardings.service';
import { OnboardingController } from './onboardings.controller';

@Module({
  controllers: [OnboardingController],
  providers: [OnboardingService],
})
export class OnboardingModule {}
