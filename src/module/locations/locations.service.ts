import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Locations } from 'src/common/interfaces/user.interface';

@Injectable()
export class LocationsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Locations[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('locations')
      .select('*');

    if (error) {
      console.error('Error fetching locations:', error.message);
      throw new InternalServerErrorException('Cannot fetch locations');
    }
    return (data as Locations[]) || [];
  }

  async findOne(location_id: string): Promise<Locations> {
    const { data, error } = await this.supabaseService.getClient()
      .from('locations')
      .select('*')
      .eq('location_id', location_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching location with ID ${location_id}:`, error?.message);
      throw new NotFoundException(`Location with ID ${location_id} not found`);
    }
    return data as Locations;
  }

  async create(dto: Omit<Locations, 'location_id'>): Promise<Locations> {
    const { data, error } = await this.supabaseService.getClient()
      .from('locations')
      .insert([dto])
      .select()
      .single();

    if (error) {
      console.error('Error creating location:', error.message);
      throw new InternalServerErrorException('Failed to create location');
    }
    return data as Locations;
  }

  async update(location_id: string, dto: Partial<Locations>): Promise<Locations> {
    const { data, error } = await this.supabaseService.getClient()
      .from('locations')
      .update(dto)
      .eq('location_id', location_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating location with ID ${location_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update location with ID ${location_id}`);
    }
    return data as Locations;
  }

  async remove(location_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('locations')
      .delete()
      .eq('location_id', location_id);

    if (error) {
      console.error(`Error deleting location with ID ${location_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete location with ID ${location_id}`);
    }
    return { message: `Location with ID ${location_id} deleted successfully` };
  }
}
