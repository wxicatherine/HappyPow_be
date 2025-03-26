import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Species } from 'src/common/interfaces/user.interface';

@Injectable()
export class SpeciesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Get all species
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('species')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching species: ' + error.message);
    return data;
  }

  // Get species by ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('species')
      .select('*')
      .eq('specie_id', id)
      .single();
    if (error) throw new NotFoundException(`Species with ID ${id} not found: ` + error.message);
    return data;
  }

  // Create a new species
  async create(data: Species) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('species')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating species: ' + error.message);
    return newEntry;
  }

  // Remove a species
  async remove(id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('species')
      .delete()
      .eq('specie_id', id);
    if (error) throw new InternalServerErrorException('Error deleting species: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
