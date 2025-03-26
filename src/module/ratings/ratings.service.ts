import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Ratings } from 'src/common/interfaces/user.interface';

@Injectable()
export class RatingsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Отримати всі рейтинги
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('ratings')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching ratings: ' + error.message);
    return data;
  }

  // Отримати рейтинг за ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('ratings')
      .select('*')
      .eq('rating_id', id)
      .single();
    if (error) throw new NotFoundException(`Rating with ID ${id} not found: ` + error.message);
    return data;
  }

  // Створити новий рейтинг
  async create(data: Ratings) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('ratings')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating rating: ' + error.message);
    return newEntry;
  }

  // Видалити рейтинг
  async remove(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('ratings')
      .delete()
      .eq('rating_id', id);
    if (error) throw new InternalServerErrorException('Error deleting rating: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
