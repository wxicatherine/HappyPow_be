import { Module } from '@nestjs/common';
import { PrioritiesService } from './priorities.service';
import { PrioritiesController } from './priorities.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [PrioritiesService,SupabaseService],
  controllers: [PrioritiesController]
})
export class PrioritiesModule {}
