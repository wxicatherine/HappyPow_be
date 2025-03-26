import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [RatingsService,SupabaseService],
  controllers: [RatingsController]
})
export class RatingsModule {}
