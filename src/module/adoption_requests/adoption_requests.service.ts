import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { AdoptionRequests } from 'src/common/interfaces/user.interface';

@Injectable()
export class AdoptionRequestsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<AdoptionRequests[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('adoption_requests')
      .select('*');

    if (error) {
      console.error('Error fetching adoption requests:', error.message);
      throw new InternalServerErrorException('Cannot fetch adoption requests');
    }
    return data || [];
  }

  async findOne(id: string): Promise<AdoptionRequests> {
    const { data, error } = await this.supabaseService.getClient()
      .from('adoption_requests')
      .select('*')
      .eq('adoption_id', id)
      .single();

    if (error || !data) {
      console.error(`Error fetching adoption request with ID ${id}:`, error?.message);
      throw new NotFoundException(`Adoption request with ID ${id} not found`);
    }
    return data;
  }

  async create(data: Omit<AdoptionRequests, 'adoption_id' | 'request_date'>): Promise<AdoptionRequests> {
    if (!data.volunteer_id || !data.shelter_id || !data.animal_id || !data.status) {
      throw new InternalServerErrorException('Missing required fields');
    }

    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('adoption_requests')
      .insert([
        {
          ...data, 
          request_date: new Date(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating adoption request:', error.message);
      throw new InternalServerErrorException('Failed to create adoption request');
    }

    return newEntry;
  }

  async remove(id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('adoption_requests')
      .delete()
      .eq('adoption_id', id);

    if (error) {
      console.error(`Error deleting adoption request with ID ${id}:`, error.message);
      throw new InternalServerErrorException('Failed to delete adoption request');
    }

    return { message: 'Deleted successfully' };
  }
}