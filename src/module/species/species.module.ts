import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [SpeciesService,SupabaseService],
  controllers: [SpeciesController]
})
export class SpeciesModule {}
