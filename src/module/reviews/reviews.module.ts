import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [ReviewsService,SupabaseService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
