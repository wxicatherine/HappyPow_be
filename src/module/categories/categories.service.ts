import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Categories } from 'src/common/interfaces/user.interface';

@Injectable()
export class CategoriesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Отримати всі категорії
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('categories')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching categories: ' + error.message);
    return data;
  }

  // Отримати одну категорію по ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('categories')
      .select('*')
      .eq('categorie_id', id)
      .single();
    if (error) throw new NotFoundException(`Category with ID ${id} not found: ` + error.message);
    return data;
  }

  // Створити нову категорію
  async create(data: Categories) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('categories')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating category: ' + error.message);
    return newEntry;
  }

  // Видалити категорію по ID
  async remove(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('categories')
      .delete()
      .eq('categorie_id', id);
    if (error) throw new InternalServerErrorException('Error deleting category: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
