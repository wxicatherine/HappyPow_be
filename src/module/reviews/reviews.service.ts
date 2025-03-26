import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Reviews } from 'src/common/interfaces/user.interface';

@Injectable()
export class ReviewsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Reviews[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('reviews')
      .select('*');

    if (error) {
      console.error('Error fetching reviews:', error.message);
      throw new InternalServerErrorException('Cannot fetch reviews');
    }
    return (data as Reviews[]) || [];
  }

  async findOne(review_id: string): Promise<Reviews> {
    const { data, error } = await this.supabaseService.getClient()
      .from('reviews')
      .select('*')
      .eq('review_id', review_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching review with ID ${review_id}:`, error?.message);
      throw new NotFoundException(`Review with ID ${review_id} not found`);
    }
    return data as Reviews;
  }

  async create(dto: Omit<Reviews, 'review_id' | 'created_at'>): Promise<Reviews> {
    // Автоматичне додавання дати створення
    const { data, error } = await this.supabaseService.getClient()
      .from('reviews')
      .insert([
        {
          ...dto,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error.message);
      throw new InternalServerErrorException('Failed to create review');
    }
    return data as Reviews;
  }

  async update(review_id: string, dto: Partial<Reviews>): Promise<Reviews> {
    const { data, error } = await this.supabaseService.getClient()
      .from('reviews')
      .update(dto)
      .eq('review_id', review_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating review with ID ${review_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update review with ID ${review_id}`);
    }
    return data as Reviews;
  }

  async remove(review_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('reviews')
      .delete()
      .eq('review_id', review_id);

    if (error) {
      console.error(`Error deleting review with ID ${review_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete review with ID ${review_id}`);
    }
    return { message: `Review with ID ${review_id} deleted successfully` };
  }
}
