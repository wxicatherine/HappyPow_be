import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Species } from 'src/common/interfaces/user.interface'; // Приклад

@Injectable()
export class SpeciesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Species[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('species')
      .select('*');

    if (error) {
      console.error('Error fetching species:', error.message);
      throw new InternalServerErrorException('Cannot fetch species');
    }
    return (data as Species[]) || [];
  }

  async findOne(species_id: string): Promise<Species> {
    const { data, error } = await this.supabaseService.getClient()
      .from('species')
      .select('*')
      .eq('species_id', species_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching species with ID ${species_id}:`, error?.message);
      throw new NotFoundException(`Species with ID ${species_id} not found`);
    }
    return data as Species;
  }

  async create(dto: Omit<Species, 'species_id'>): Promise<Species> {
    const { data, error } = await this.supabaseService.getClient()
      .from('species')
      .insert([dto])
      .select()
      .single();

    if (error) {
      console.error('Error creating species:', error.message);
      throw new InternalServerErrorException('Failed to create species');
    }
    return data as Species;
  }

  async update(species_id: string, dto: Partial<Species>): Promise<Species> {
    const { data, error } = await this.supabaseService.getClient()
      .from('species')
      .update(dto)
      .eq('species_id', species_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating species with ID ${species_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update species with ID ${species_id}`);
    }
    return data as Species;
  }

  async remove(species_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('species')
      .delete()
      .eq('species_id', species_id);

    if (error) {
      console.error(`Error deleting species with ID ${species_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete species with ID ${species_id}`);
    }
    return { message: `Species with ID ${species_id} deleted successfully` };
  }
}
