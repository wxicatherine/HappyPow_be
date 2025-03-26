import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { BankAccounts } from 'src/common/interfaces/user.interface';


@Injectable()
export class BankAccountsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Отримати всі банківські рахунки
  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('bank_accounts')
      .select('*');
    if (error) throw new InternalServerErrorException('Error fetching bank accounts: ' + error.message);
    return data;
  }

  // Отримати банківський рахунок по ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('bank_accounts')
      .select('*')
      .eq('bank_account_id', id)
      .single();
    if (error) throw new NotFoundException(`Bank account with ID ${id} not found: ` + error.message);
    return data;
  }

  // Створити новий банківський рахунок
  async create(data: BankAccounts) {
    const { data: newEntry, error } = await this.supabaseService.getClient()
      .from('bank_accounts')
      .insert([data])
      .select()
      .single();
    if (error) throw new InternalServerErrorException('Error creating bank account: ' + error.message);
    return newEntry;
  }

  // Видалити банківський рахунок по ID
  async remove(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('bank_accounts')
      .delete()
      .eq('bank_account_id', id);
    if (error) throw new InternalServerErrorException('Error deleting bank account: ' + error.message);
    return { message: 'Deleted successfully' };
  }
}
