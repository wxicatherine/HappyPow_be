import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Categories } from 'src/common/interfaces/user.interface'; // Приклад

@Injectable()
export class CategoriesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Categories[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('categories')
      .select('*');

    if (error) {
      console.error('Error fetching categories:', error.message);
      throw new InternalServerErrorException('Cannot fetch categories');
    }
    return (data as Categories[]) || [];
  }

  async findOne(category_id: string): Promise<Categories> {
    const { data, error } = await this.supabaseService.getClient()
      .from('categories')
      .select('*')
      .eq('category_id', category_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching category with ID ${category_id}:`, error?.message);
      throw new NotFoundException(`Category with ID ${category_id} not found`);
    }
    return data as Categories;
  }

  async create(dto: Omit<Categories, 'category_id'>): Promise<Categories> {
    const { data, error } = await this.supabaseService.getClient()
      .from('categories')
      .insert([dto])
      .select()
      .single();

    if (error) {
      console.error('Error creating category:', error.message);
      throw new InternalServerErrorException('Failed to create category');
    }
    return data as Categories;
  }

  async update(category_id: string, dto: Partial<Categories>): Promise<Categories> {
    const { data, error } = await this.supabaseService.getClient()
      .from('categories')
      .update(dto)
      .eq('category_id', category_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating category with ID ${category_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update category with ID ${category_id}`);
    }
    return data as Categories;
  }

  async remove(category_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('categories')
      .delete()
      .eq('category_id', category_id);

    if (error) {
      console.error(`Error deleting category with ID ${category_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete category with ID ${category_id}`);
    }
    return { message: `Category with ID ${category_id} deleted successfully` };
  }
}
