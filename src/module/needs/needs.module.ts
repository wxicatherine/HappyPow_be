import { Module } from '@nestjs/common';
import { NeedsService } from './needs.service';
import { NeedsController } from './needs.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [NeedsService,SupabaseService],
  controllers: [NeedsController]
})
export class NeedsModule {}
