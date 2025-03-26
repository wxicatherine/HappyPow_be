import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { UserSessions } from 'src/common/interfaces/user.interface';  // Assuming this interface exists

@Injectable()
export class UserSessionsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Get all user sessions
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('user_sessions')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching user sessions: ' + error.message);
    return data;
  }

  // Get a single user session by ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('user_sessions')
      .select('*')
      .eq('user_session_id', id)
      .single();
    if (error) throw new NotFoundException(`User session with ID ${id} not found: ` + error.message);
    return data;
  }

  // Create a new user session
  async create(data: UserSessions) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('user_sessions')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating user session: ' + error.message);
    return newEntry;
  }

  // Remove a user session by ID
  async remove(id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('user_sessions')
      .delete()
      .eq('user_session_id', id);
    if (error) throw new InternalServerErrorException('Error deleting user session: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
