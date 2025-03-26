import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Breeds } from 'src/common/interfaces/user.interface';

@Injectable()
export class BreedsService {
  constructor(private readonly supabaseService: SupabaseService) {}

 
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('breads')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching breads: ' + error.message);
    return data;
  }

  // Отримати одиy по ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('breads')
      .select('*')
      .eq('bread_id', id)
      .single();
    if (error) throw new NotFoundException(`Bread with ID ${id} not found: ` + error.message);
    return data;
  }

  // Створити новий хліб
  async create(data: Breeds) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('breads')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating bread: ' + error.message);
    return newEntry;
  }

  // Видалити  по ID
  async remove(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('breads')
      .delete()
      .eq('bread_id', id);
    if (error) throw new InternalServerErrorException('Error deleting bread: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
