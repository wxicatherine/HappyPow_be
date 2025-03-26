import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';

import { Volunteer } from 'src/common/interfaces/user.interface';  // Assuming this interface exists

@Injectable()
export class VolunteerService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Get all volunteers
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('volunteer')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching volunteers: ' + error.message);
    return data;
  }

  // Get a single volunteer by ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('volunteer')
      .select('*')
      .eq('volunteer_id', id)
      .single();
    if (error) throw new NotFoundException(`Volunteer with ID ${id} not found: ` + error.message);
    return data;
  }

  // Create a new volunteer
  async create(data: Volunteer) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('volunteer')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating volunteer: ' + error.message);
    return newEntry;
  }

  // Remove a volunteer by ID
  async remove(id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('volunteer')
      .delete()
      .eq('volunteer_id', id);
    if (error) throw new InternalServerErrorException('Error deleting volunteer: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
