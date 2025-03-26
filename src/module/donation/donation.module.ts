import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [DonationService,SupabaseService],
  controllers: [DonationController]
})
export class DonationModule {}
