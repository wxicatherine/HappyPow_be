import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Needs } from 'src/common/interfaces/user.interface';

@Injectable()
export class NeedsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Отримати всі потреби
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('needs')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching needs: ' + error.message);
    return data;
  }

  // Отримати потребу за ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('needs')
      .select('*')
      .eq('need_id', id)
      .single();
    if (error) throw new NotFoundException(`Need with ID ${id} not found: ` + error.message);
    return data;
  }

  // Створити нову потребу
  async create(data:Needs) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('needs')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating need: ' + error.message);
    return newEntry;
  }

  // Видалити потребу
  async remove(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('needs')
      .delete()
      .eq('need_id', id);
    if (error) throw new InternalServerErrorException('Error deleting need: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
