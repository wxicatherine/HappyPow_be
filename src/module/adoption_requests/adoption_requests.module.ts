import { Module } from '@nestjs/common';
import { AdoptionRequestsService } from './adoption_requests.service';
import { AdoptionRequestsController } from './adoption_requests.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [AdoptionRequestsService,SupabaseService],
  controllers: [AdoptionRequestsController]
})
export class AdoptionRequestsModule {}
