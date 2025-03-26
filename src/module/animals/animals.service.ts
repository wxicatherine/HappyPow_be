import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../service/supabase.service';
import { Animals } from 'src/common/interfaces/user.interface';

@Injectable()
export class AnimalsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Отримати всіх тварин
  async findAll(): Promise<Animals[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('animals')
      .select(`
        *,
        shelters (name, location),
        species (name)
      `);

    if (error) {
      console.error('Error fetching animals:', error.message);
      throw new InternalServerErrorException('Failed to fetch animals: ' + error.message);
    }
    return data as Animals[];
  }

  // Отримати тварину по ID разом із даними притулку
  async findOne(id: string): Promise<Animals> {
    const { data, error } = await this.supabaseService.getClient()
      .from('animals')
      .select(`
        *,
        shelters (name, location)
      `)
      .eq('animal_id', id)
      .single();

    if (error || !data) {
      console.error(`Error fetching animal with ID ${id}:`, error?.message);
      throw new NotFoundException(`Animal with ID ${id} not found: ` + error?.message);
    }
    return data as Animals;
  }

  // Додати нову тварину
  async create(animalDto: Animals): Promise<Animals> {
    // Перевірка, чи існує притулок
    const { data: shelterData, error: shelterError } = await this.supabaseService.getClient()
      .from('shelters')
      .select('shelter_id')
      .eq('shelter_id', animalDto.shelter_id)
      .single();

    if (shelterError || !shelterData) {
      throw new NotFoundException('Притулок не знайдено');
    }

    const { data, error } = await this.supabaseService.getClient()
      .from('animals')
      .insert([animalDto])
      .select()
      .single();

    if (error) {
      console.error('Error creating animal:', error.message);
      throw new InternalServerErrorException('Failed to create animal: ' + error.message);
    }
    return data as Animals;
  }

  // Оновити дані тварини
  async update(id: string, animalDto: Partial<Animals>): Promise<Animals> {
    const { data, error } = await this.supabaseService.getClient()
      .from('animals')
      .update(animalDto)
      .eq('animal_id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating animal with ID ${id}:`, error.message);
      throw new InternalServerErrorException('Failed to update animal: ' + error.message);
    }
    return data as Animals;
  }

  // Видалити тварину та пов'язані записи
  async delete(id: string): Promise<{ message: string }> {
    // Видаляємо пов'язані adoption_requests
    const { error: adoptionError } = await this.supabaseService.getClient()
      .from('adoption_requests')
      .delete()
      .eq('animal_id', id);

    if (adoptionError) {
      console.error(`Error deleting adoption requests for animal ID ${id}:`, adoptionError.message);
      throw new InternalServerErrorException('Failed to delete adoption requests: ' + adoptionError.message);
    }

    // Видаляємо саму тварину
    const { error } = await this.supabaseService.getClient()
      .from('animals')
      .delete()
      .eq('animal_id', id);

    if (error) {
      console.error(`Error deleting animal with ID ${id}:`, error.message);
      throw new InternalServerErrorException('Failed to delete animal: ' + error.message);
    }

    return { message: 'Тварину та пов’язані записи видалено' };
  }
}
