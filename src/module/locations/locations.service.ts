import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Locations } from 'src/common/interfaces/user.interface';

@Injectable()
export class LocationsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Отримати всі локації
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('location')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching locations: ' + error.message);
    return data;
  }

  // Отримати локацію за ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('location')
      .select('*')
      .eq('location_id', id)
      .single();
    if (error) throw new NotFoundException(`Location with ID ${id} not found: ` + error.message);
    return data;
  }

  // Створити нову локацію
  async create(data: Locations) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('location')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating location: ' + error.message);
    return newEntry;
  }

  // Видалити локацію
  async remove(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('location')
      .delete()
      .eq('location_id', id);
    if (error) throw new InternalServerErrorException('Error deleting location: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
