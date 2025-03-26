
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';

@Injectable()
export class WalkRequestService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('walk_request')
      .select('*');
    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('walk_request')
      .select('*')
      .eq('walk_request_id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async create(data: any) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('walk_request')
      .insert([data])
      .select()
      .single();
    if (error) throw error;
    return newEntry;
  }

  async remove(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('walk_request')
      .delete()
      .eq('walk_request_id', id);
    if (error) throw error;
    return { message: 'Deleted successfully' };
  }
}
