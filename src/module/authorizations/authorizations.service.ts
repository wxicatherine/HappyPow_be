import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Authorizations } from 'src/common/interfaces/user.interface'; // Приклад

@Injectable()
export class AuthorizationsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Authorizations[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('authorizations')
      .select('*');

    if (error) {
      console.error('Error fetching authorizations:', error.message);
      throw new InternalServerErrorException('Cannot fetch authorizations');
    }
    return (data as Authorizations[]) || [];
  }

  async findOne(auth_id: string): Promise<Authorizations> {
    const { data, error } = await this.supabaseService.getClient()
      .from('authorizations')
      .select('*')
      .eq('auth_id', auth_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching authorization with ID ${auth_id}:`, error?.message);
      throw new NotFoundException(`Authorization with ID ${auth_id} not found`);
    }
    return data as Authorizations;
  }

  async create(dto: Omit<Authorizations, 'auth_id'>): Promise<Authorizations> {
    // Додайте валідацію, якщо потрібно
    const { data, error } = await this.supabaseService.getClient()
      .from('authorizations')
      .insert([dto])
      .select()
      .single();

    if (error) {
      console.error('Error creating authorization:', error.message);
      throw new InternalServerErrorException('Failed to create authorization');
    }
    return data as Authorizations;
  }

  async update(auth_id: string, dto: Partial<Authorizations>): Promise<Authorizations> {
    const { data, error } = await this.supabaseService.getClient()
      .from('authorizations')
      .update(dto)
      .eq('auth_id', auth_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating authorization with ID ${auth_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update authorization with ID ${auth_id}`);
    }
    return data as Authorizations;
  }

  async remove(auth_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('authorizations')
      .delete()
      .eq('auth_id', auth_id);

    if (error) {
      console.error(`Error deleting authorization with ID ${auth_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete authorization with ID ${auth_id}`);
    }
    return { message: `Authorization with ID ${auth_id} deleted successfully` };
  }
}
