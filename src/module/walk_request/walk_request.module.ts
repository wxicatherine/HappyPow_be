import { Module } from '@nestjs/common';
import { WalkRequestService } from './walk_request.service';
import { WalkRequestController } from './walk_request.controller';
import { SupabaseService } from 'src/service/supabase.service';

@Module({
  providers: [WalkRequestService,SupabaseService],
  controllers: [WalkRequestController]
})
export class WalkRequestModule {}
