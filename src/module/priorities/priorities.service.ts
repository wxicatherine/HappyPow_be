import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Priorities } from 'src/common/interfaces/user.interface';

@Injectable()
export class PrioritiesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Отримати всі пріоритети
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('priorities')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching priorities: ' + error.message);
    return data;
  }

  // Отримати пріоритет за ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('priorities')
      .select('*')
      .eq('prioritie_id', id)
      .single();
    if (error) throw new NotFoundException(`Priority with ID ${id} not found: ` + error.message);
    return data;
  }

  // Створити новий пріоритет
  async create(data: Priorities) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('priorities')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating priority: ' + error.message);
    return newEntry;
  }

  // Видалити пріоритет
  async remove(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('priorities')
      .delete()
      .eq('prioritie_id', id);
    if (error) throw new InternalServerErrorException('Error deleting priority: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
