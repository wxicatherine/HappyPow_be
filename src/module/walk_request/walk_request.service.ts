import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { WalkRequest } from 'src/common/interfaces/user.interface'; // Приклад

@Injectable()
export class WalkRequestService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<WalkRequest[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('walk_request')
      .select('*');

    if (error) {
      console.error('Error fetching walk requests:', error.message);
      throw new InternalServerErrorException('Cannot fetch walk requests');
    }
    return (data as WalkRequest[]) || [];
  }

  async findOne(walk_request_id: string): Promise<WalkRequest> {
    const { data, error } = await this.supabaseService.getClient()
      .from('walk_request')
      .select('*')
      .eq('walk_request_id', walk_request_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching walk request with ID ${walk_request_id}:`, error?.message);
      throw new NotFoundException(`Walk request with ID ${walk_request_id} not found`);
    }
    return data as WalkRequest;
  }

  async create(dto: Omit<WalkRequest, 'walk_request_id' | 'request_date'>): Promise<WalkRequest> {
    // Приклад: автоматично додаємо дату запиту
    const { data, error } = await this.supabaseService.getClient()
      .from('walk_request')
      .insert([
        {
          ...dto,
          request_date: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating walk request:', error.message);
      throw new InternalServerErrorException('Failed to create walk request');
    }
    return data as WalkRequest;
  }

  async update(walk_request_id: string, dto: Partial<WalkRequest>): Promise<WalkRequest> {
    const { data, error } = await this.supabaseService.getClient()
      .from('walk_request')
      .update(dto)
      .eq('walk_request_id', walk_request_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating walk request with ID ${walk_request_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update walk request with ID ${walk_request_id}`);
    }
    return data as WalkRequest;
  }

  async remove(walk_request_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('walk_request')
      .delete()
      .eq('walk_request_id', walk_request_id);

    if (error) {
      console.error(`Error deleting walk request with ID ${walk_request_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete walk request with ID ${walk_request_id}`);
    }
    return { message: `Walk request with ID ${walk_request_id} deleted successfully` };
  }
}
