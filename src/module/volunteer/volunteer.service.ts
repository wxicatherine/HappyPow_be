import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Volunteer } from 'src/common/interfaces/user.interface'; // Приклад

@Injectable()
export class VolunteerService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Volunteer[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('volunteer')
      .select('*');

    if (error) {
      console.error('Error fetching volunteers:', error.message);
      throw new InternalServerErrorException('Cannot fetch volunteers');
    }
    return (data as Volunteer[]) || [];
  }

  async findOne(volunteer_id: string): Promise<Volunteer> {
    const { data, error } = await this.supabaseService.getClient()
      .from('volunteer')
      .select('*')
      .eq('volunteer_id', volunteer_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching volunteer with ID ${volunteer_id}:`, error?.message);
      throw new NotFoundException(`Volunteer with ID ${volunteer_id} not found`);
    }
    return data as Volunteer;
  }

  async create(dto: Omit<Volunteer, 'volunteer_id'>): Promise<Volunteer> {
    // Додайте валідацію, якщо потрібно
    const { data, error } = await this.supabaseService.getClient()
      .from('volunteer')
      .insert([dto])
      .select()
      .single();

    if (error) {
      console.error('Error creating volunteer:', error.message);
      throw new InternalServerErrorException('Failed to create volunteer');
    }
    return data as Volunteer;
  }

  async update(volunteer_id: string, dto: Partial<Volunteer>): Promise<Volunteer> {
    const { data, error } = await this.supabaseService.getClient()
      .from('volunteer')
      .update(dto)
      .eq('volunteer_id', volunteer_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating volunteer with ID ${volunteer_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update volunteer with ID ${volunteer_id}`);
    }
    return data as Volunteer;
  }

  async remove(volunteer_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('volunteer')
      .delete()
      .eq('volunteer_id', volunteer_id);

    if (error) {
      console.error(`Error deleting volunteer with ID ${volunteer_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete volunteer with ID ${volunteer_id}`);
    }
    return { message: `Volunteer with ID ${volunteer_id} deleted successfully` };
  }
}
