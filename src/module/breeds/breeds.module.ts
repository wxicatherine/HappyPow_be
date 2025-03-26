import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [BreedsService,SupabaseService],
  controllers: [BreedsController]
})
export class BreedsModule {}
