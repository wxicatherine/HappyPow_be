import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Needs } from 'src/common/interfaces/user.interface'; // Приклад

@Injectable()
export class NeedsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Needs[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('needs')
      .select('*');

    if (error) {
      console.error('Error fetching needs:', error.message);
      throw new InternalServerErrorException('Cannot fetch needs');
    }
    return (data as Needs[]) || [];
  }

  async findOne(need_id: string): Promise<Needs> {
    const { data, error } = await this.supabaseService.getClient()
      .from('needs')
      .select('*')
      .eq('need_id', need_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching need with ID ${need_id}:`, error?.message);
      throw new NotFoundException(`Need with ID ${need_id} not found`);
    }
    return data as Needs;
  }

  async create(dto: Omit<Needs, 'need_id'>): Promise<Needs> {
    const { data, error } = await this.supabaseService.getClient()
      .from('needs')
      .insert([dto])
      .select()
      .single();

    if (error) {
      console.error('Error creating need:', error.message);
      throw new InternalServerErrorException('Failed to create need');
    }
    return data as Needs;
  }

  async update(need_id: string, dto: Partial<Needs>): Promise<Needs> {
    const { data, error } = await this.supabaseService.getClient()
      .from('needs')
      .update(dto)
      .eq('need_id', need_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating need with ID ${need_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update need with ID ${need_id}`);
    }
    return data as Needs;
  }

  async remove(need_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('needs')
      .delete()
      .eq('need_id', need_id);

    if (error) {
      console.error(`Error deleting need with ID ${need_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete need with ID ${need_id}`);
    }
    return { message: `Need with ID ${need_id} deleted successfully` };
  }
}
