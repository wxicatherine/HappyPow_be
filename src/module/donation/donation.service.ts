import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Donation } from 'src/common/interfaces/user.interface';
@Injectable()
export class DonationService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Отримати всі донати
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('donation')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching donations: ' + error.message);
    return data;
  }

  // Отримати один донат по ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('donation')
      .select('*')
      .eq('donation_id', id)
      .single();
    if (error) throw new NotFoundException(`Donation with ID ${id} not found: ` + error.message);
    return data;
  }

  // Створити новий донат
  async create(data: Donation) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('donation')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating donation: ' + error.message);
    return newEntry;
  }

  // Видалити донат по ID
  async remove(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('donation')
      .delete()
      .eq('donation_id', id);
    if (error) throw new InternalServerErrorException('Error deleting donation: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
