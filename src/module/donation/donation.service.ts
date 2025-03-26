import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Donation } from 'src/common/interfaces/user.interface'; // Приклад

@Injectable()
export class DonationService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Donation[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('donation')
      .select('*');

    if (error) {
      console.error('Error fetching donations:', error.message);
      throw new InternalServerErrorException('Cannot fetch donations');
    }
    return (data as Donation[]) || [];
  }

  async findOne(donation_id: string): Promise<Donation> {
    const { data, error } = await this.supabaseService.getClient()
      .from('donation')
      .select('*')
      .eq('donation_id', donation_id)
      .single();

    if (error || !data) {
      console.error(`Error fetching donation with ID ${donation_id}:`, error?.message);
      throw new NotFoundException(`Donation with ID ${donation_id} not found`);
    }
    return data as Donation;
  }

  async create(dto: Omit<Donation, 'donation_id' | 'created_at'>): Promise<Donation> {
    // Приклад: автоматично додаємо час створення
    const { data, error } = await this.supabaseService.getClient()
      .from('donation')
      .insert([
        {
          ...dto,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating donation:', error.message);
      throw new InternalServerErrorException('Failed to create donation');
    }
    return data as Donation;
  }

  async update(donation_id: string, dto: Partial<Donation>): Promise<Donation> {
    const { data, error } = await this.supabaseService.getClient()
      .from('donation')
      .update(dto)
      .eq('donation_id', donation_id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating donation with ID ${donation_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to update donation with ID ${donation_id}`);
    }
    return data as Donation;
  }

  async remove(donation_id: string): Promise<{ message: string }> {
    const { error } = await this.supabaseService.getClient()
      .from('donation')
      .delete()
      .eq('donation_id', donation_id);

    if (error) {
      console.error(`Error deleting donation with ID ${donation_id}:`, error.message);
      throw new InternalServerErrorException(`Failed to delete donation with ID ${donation_id}`);
    }
    return { message: `Donation with ID ${donation_id} deleted successfully` };
  }
}
