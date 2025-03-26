import { Module } from '@nestjs/common';
import { AuthorizationsService } from './authorizations.service';
import { AuthorizationsController } from './authorizations.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [AuthorizationsService,SupabaseService],
  controllers: [AuthorizationsController]
})
export class AuthorizationsModule {}
