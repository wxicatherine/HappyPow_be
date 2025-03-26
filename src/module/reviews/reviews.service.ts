import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Reviews } from 'src/common/interfaces/user.interface';
@Injectable()
export class ReviewsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Отримати всі відгуки
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('reviews')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching reviews: ' + error.message);
    return data;
  }

  // Отримати відгук за ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('reviews')
      .select('*')
      .eq('review_id', id)
      .single();
    if (error) throw new NotFoundException(`Review with ID ${id} not found: ` + error.message);
    return data;
  }

  // Створити новий відгук
  async create(data: Reviews) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('reviews')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating review: ' + error.message);
    return newEntry;
  }

  // Видалити відгук
  async remove(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('reviews')
      .delete()
      .eq('review_id', id);
    if (error) throw new InternalServerErrorException('Error deleting review: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
