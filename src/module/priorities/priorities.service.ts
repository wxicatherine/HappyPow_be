import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Priorities } from 'src/common/interfaces/user.interface'; // Приклад

@Injectable()
export class PrioritiesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Priorities[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('priorities')
      .select('*');

    if (error) {
      console.error('Error fetching priorities:', error.message);
      throw new InternalServerErrorException('Cannot fetch priorities');
    }
    return (data as Priorities[]) || [];
  }

  async findOne(priority_id: string): Promise<Priorities> {
    const { data, error } = await this.supabaseService.getClient()
      .from('priorities')
      .select('*')
      .eq('priority_id', priority_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching priority with ID ${priority_id}:`, error?.message);
      throw new NotFoundException(`Priority with ID ${priority_id} not found`);
    }
    return data as Priorities;
  }

  async create(dto: Omit<Priorities, 'priority_id'>): Promise<Priorities> {
    const { data, error } = await this.supabaseService.getClient()
      .from('priorities')
      .insert([dto])
      .select()
      .single();

    if (error) {
      console.error('Error creating priority:', error.message);
      throw new InternalServerErrorException('Failed to create priority');
    }
    return data as Priorities;
  }

  async update(priority_id: string, dto: Partial<Priorities>): Promise<Priorities> {
    const { data, error } = await this.supabaseService.getClient()
      .from('priorities')
      .update(dto)
      .eq('priority_id', priority_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating priority with ID ${priority_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update priority with ID ${priority_id}`);
    }
    return data as Priorities;
  }

  async remove(priority_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('priorities')
      .delete()
      .eq('priority_id', priority_id);

    if (error) {
      console.error(`Error deleting priority with ID ${priority_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete priority with ID ${priority_id}`);
    }
    return { message: `Priority with ID ${priority_id} deleted successfully` };
  }
}
