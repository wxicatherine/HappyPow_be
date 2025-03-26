import { Module } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { SheltersController } from './shelters.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [SheltersService,SupabaseService],
  controllers: [SheltersController]
})
export class SheltersModule {}
