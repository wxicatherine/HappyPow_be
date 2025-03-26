import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [VolunteerService,SupabaseService],
  controllers: [VolunteerController]
})
export class VolunteerModule {}
