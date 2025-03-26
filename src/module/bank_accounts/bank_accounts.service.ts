import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { BankAccounts } from 'src/common/interfaces/user.interface'; // Приклад

@Injectable()
export class BankAccountsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<BankAccounts[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('bank_accounts')
      .select('*');

    if (error) {
      console.error('Error fetching bank_accounts:', error.message);
      throw new InternalServerErrorException('Cannot fetch bank accounts');
    }
    return (data as BankAccounts[]) || [];
  }

  async findOne(bank_account_id: string): Promise<BankAccounts> {
    const { data, error } = await this.supabaseService.getClient()
      .from('bank_accounts')
      .select('*')
      .eq('bank_account_id', bank_account_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching bank account with ID ${bank_account_id}:`, error?.message);
      throw new NotFoundException(`Bank account with ID ${bank_account_id} not found`);
    }
    return data as BankAccounts;
  }

  async create(dto: Omit<BankAccounts, 'bank_account_id'>): Promise<BankAccounts> {
    // Додайте валідацію, якщо потрібно
    const { data, error } = await this.supabaseService.getClient()
      .from('bank_accounts')
      .insert([dto])
      .select()
      .single();

    if (error) {
      console.error('Error creating bank account:', error.message);
      throw new InternalServerErrorException('Failed to create bank account');
    }
    return data as BankAccounts;
  }

  async update(bank_account_id: string, dto: Partial<BankAccounts>): Promise<BankAccounts> {
    const { data, error } = await this.supabaseService.getClient()
      .from('bank_accounts')
      .update(dto)
      .eq('bank_account_id', bank_account_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating bank account with ID ${bank_account_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update bank account with ID ${bank_account_id}`);
    }
    return data as BankAccounts;
  }

  async remove(bank_account_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('bank_accounts')
      .delete()
      .eq('bank_account_id', bank_account_id);

    if (error) {
      console.error(`Error deleting bank account with ID ${bank_account_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete bank account with ID ${bank_account_id}`);
    }
    return { message: `Bank account with ID ${bank_account_id} deleted successfully` };
  }
}
