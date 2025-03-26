import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { BankAccountsService } from './bank_accounts.service';
import { BankAccounts } from 'src/common/interfaces/user.interface';

@Controller('bank_accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  // Отримати всі банківські рахунки
  @Get()
  findAll() {
    return this.bankAccountsService.findAll();
  }

  // Отримати один банківський рахунок по ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountsService.findOne(id);
  }

  // Створити новий банківський рахунок
  @Post()
  create(@Body() data: BankAccounts) {
    return this.bankAccountsService.create(data);
  }

  // Видалити банківський рахунок по ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountsService.remove(id);
  }
}
