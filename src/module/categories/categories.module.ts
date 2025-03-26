import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [CategoriesService,SupabaseService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
