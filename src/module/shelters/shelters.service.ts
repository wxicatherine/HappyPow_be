import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Shelters } from 'src/common/interfaces/user.interface'; // Приклад

@Injectable()
export class SheltersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Shelters[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('shelters')
      .select('*');

    if (error) {
      console.error('Error fetching shelters:', error.message);
      throw new InternalServerErrorException('Cannot fetch shelters');
    }
    return (data as Shelters[]) || [];
  }

  async findOne(shelter_id: string): Promise<Shelters> {
    const { data, error } = await this.supabaseService.getClient()
      .from('shelters')
      .select('*')
      .eq('shelter_id', shelter_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching shelter with ID ${shelter_id}:`, error?.message);
      throw new NotFoundException(`Shelter with ID ${shelter_id} not found`);
    }
    return data as Shelters;
  }

  async create(dto: Omit<Shelters, 'shelter_id'>): Promise<Shelters> {
    const { data, error } = await this.supabaseService.getClient()
      .from('shelters')
      .insert([dto])
      .select()
      .single();

    if (error) {
      console.error('Error creating shelter:', error.message);
      throw new InternalServerErrorException('Failed to create shelter');
    }
    return data as Shelters;
  }

  async update(shelter_id: string, dto: Partial<Shelters>): Promise<Shelters> {
    const { data, error } = await this.supabaseService.getClient()
      .from('shelters')
      .update(dto)
      .eq('shelter_id', shelter_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating shelter with ID ${shelter_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update shelter with ID ${shelter_id}`);
    }
    return data as Shelters;
  }

  async remove(shelter_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('shelters')
      .delete()
      .eq('shelter_id', shelter_id);

    if (error) {
      console.error(`Error deleting shelter with ID ${shelter_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete shelter with ID ${shelter_id}`);
    }
    return { message: `Shelter with ID ${shelter_id} deleted successfully` };
  }
}
