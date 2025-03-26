import { Module } from '@nestjs/common';
import { UserSessionsService } from './user_sessions.service';
import { UserSessionsController } from './user_sessions.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [UserSessionsService,SupabaseService],
  controllers: [UserSessionsController]
})
export class UserSessionsModule {}
