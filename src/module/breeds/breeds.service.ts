import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Breeds } from 'src/common/interfaces/user.interface'; // Приклад

@Injectable()
export class BreedsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Breeds[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('breeds')
      .select('*');

    if (error) {
      console.error('Error fetching breeds:', error.message);
      throw new InternalServerErrorException('Cannot fetch breeds');
    }
    return (data as Breeds[]) || [];
  }

  async findOne(breed_id: string): Promise<Breeds> {
    const { data, error } = await this.supabaseService.getClient()
      .from('breeds')
      .select('*')
      .eq('breed_id', breed_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching breed with ID ${breed_id}:`, error?.message);
      throw new NotFoundException(`Breed with ID ${breed_id} not found`);
    }
    return data as Breeds;
  }

  async create(dto: Omit<Breeds, 'breed_id'>): Promise<Breeds> {
    const { data, error } = await this.supabaseService.getClient()
      .from('breeds')
      .insert([dto])
      .select()
      .single();

    if (error) {
      console.error('Error creating breed:', error.message);
      throw new InternalServerErrorException('Failed to create breed');
    }
    return data as Breeds;
  }

  async update(breed_id: string, dto: Partial<Breeds>): Promise<Breeds> {
    const { data, error } = await this.supabaseService.getClient()
      .from('breeds')
      .update(dto)
      .eq('breed_id', breed_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating breed with ID ${breed_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update breed with ID ${breed_id}`);
    }
    return data as Breeds;
  }

  async remove(breed_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('breeds')
      .delete()
      .eq('breed_id', breed_id);

    if (error) {
      console.error(`Error deleting breed with ID ${breed_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete breed with ID ${breed_id}`);
    }
    return { message: `Breed with ID ${breed_id} deleted successfully` };
  }
}
