import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { SupabaseService } from 'src/service/supabase.service';

@Module({
  providers: [AnimalsService,SupabaseService],
  controllers: [AnimalsController]
})
export class AnimalsModule {}
