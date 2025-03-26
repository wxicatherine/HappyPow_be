import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';

import { Shelters } from 'src/common/interfaces/user.interface';

@Injectable()
export class SheltersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Get all shelters
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('shelter')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching shelters: ' + error.message);
    return data;
  }

  // Get shelter by ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('shelter')
      .select('*')
      .eq('shelter_id', id)
      .single();
    if (error) throw new NotFoundException(`Shelter with ID ${id} not found: ` + error.message);
    return data;
  }

  // Create a new shelter
  async create(data: Shelters) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('shelter')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating shelter: ' + error.message);
    return newEntry;
  }

  // Remove a shelter
  async remove(id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('shelter')
      .delete()
      .eq('shelter_id', id);
    if (error) throw new InternalServerErrorException('Error deleting shelter: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
