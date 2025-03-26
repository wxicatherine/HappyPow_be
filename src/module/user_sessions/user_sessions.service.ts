import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { UserSessions } from 'src/common/interfaces/user.interface'; // Приклад

@Injectable()
export class UserSessionsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<UserSessions[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('user_sessions')
      .select('*');

    if (error) {
      console.error('Error fetching user_sessions:', error.message);
      throw new InternalServerErrorException('Cannot fetch user sessions');
    }
    return (data as UserSessions[]) || [];
  }

  async findOne(session_id: string): Promise<UserSessions> {
    const { data, error } = await this.supabaseService.getClient()
      .from('user_sessions')
      .select('*')
      .eq('session_id', session_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching user session with ID ${session_id}:`, error?.message);
      throw new NotFoundException(`User session with ID ${session_id} not found`);
    }
    return data as UserSessions;
  }

  async create(dto: Omit<UserSessions, 'session_id'>): Promise<UserSessions> {
    const { data, error } = await this.supabaseService.getClient()
      .from('user_sessions')
      .insert([dto])
      .select()
      .single();

    if (error) {
      console.error('Error creating user session:', error.message);
      throw new InternalServerErrorException('Failed to create user session');
    }
    return data as UserSessions;
  }

  async update(session_id: string, dto: Partial<UserSessions>): Promise<UserSessions> {
    const { data, error } = await this.supabaseService.getClient()
      .from('user_sessions')
      .update(dto)
      .eq('session_id', session_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating user session with ID ${session_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update user session with ID ${session_id}`);
    }
    return data as UserSessions;
  }

  async remove(session_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('user_sessions')
      .delete()
      .eq('session_id', session_id);

    if (error) {
      console.error(`Error deleting user session with ID ${session_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete user session with ID ${session_id}`);
    }
    return { message: `User session with ID ${session_id} deleted successfully` };
  }
}
