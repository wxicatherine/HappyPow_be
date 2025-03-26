import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Authorizations } from'src/common/interfaces/user.interface';
@Injectable()
export class AuthorizationsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Отримати всі записи авторизації
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('authorization')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching authorizations: ' + error.message);
    return data;
  }

  // Отримати запис авторизації по ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('authorization')
      .select('*')
      .eq('authorization_id', id)
      .single();
    if (error) throw new NotFoundException(`Authorization with ID ${id} not found: ` + error.message);
    return data;
  }

  // Створити новий запис авторизації
  async create(data: Authorizations) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('authorization')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating authorization: ' + error.message);
    return newEntry;
  }

  // Видалити запис авторизації по ID
  async remove(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('authorization')
      .delete()
      .eq('authorization_id', id);
    if (error) throw new InternalServerErrorException('Error deleting authorization: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
