import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Ratings } from 'src/common/interfaces/user.interface';

@Injectable()
export class RatingsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Ratings[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('ratings')
      .select('*');

    if (error) {
      console.error('Error fetching ratings:', error.message);
      throw new InternalServerErrorException('Cannot fetch ratings');
    }
    return (data as Ratings[]) || [];
  }

  async findOne(rating_id: string): Promise<Ratings> {
    const { data, error } = await this.supabaseService.getClient()
      .from('ratings')
      .select('*')
      .eq('rating_id', rating_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching rating with ID ${rating_id}:`, error?.message);
      throw new NotFoundException(`Rating with ID ${rating_id} not found`);
    }
    return data as Ratings;
  }

  async create(dto: Omit<Ratings, 'rating_id'>): Promise<Ratings> {
    const { data, error } = await this.supabaseService.getClient()
      .from('ratings')
      .insert([dto])
      .select()
      .single();

    if (error) {
      console.error('Error creating rating:', error.message);
      throw new InternalServerErrorException('Failed to create rating');
    }
    return data as Ratings;
  }

  async update(rating_id: string, dto: Partial<Ratings>): Promise<Ratings> {
    const { data, error } = await this.supabaseService.getClient()
      .from('ratings')
      .update(dto)
      .eq('rating_id', rating_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating rating with ID ${rating_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update rating with ID ${rating_id}`);
    }
    return data as Ratings;
  }

  async remove(rating_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('ratings')
      .delete()
      .eq('rating_id', rating_id);

    if (error) {
      console.error(`Error deleting rating with ID ${rating_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete rating with ID ${rating_id}`);
    }
    return { message: `Rating with ID ${rating_id} deleted successfully` };
  }
}
