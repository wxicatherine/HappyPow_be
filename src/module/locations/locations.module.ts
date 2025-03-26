import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [LocationsService,SupabaseService],
  controllers: [LocationsController]
})
export class LocationsModule {}
