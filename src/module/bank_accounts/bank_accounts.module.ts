import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank_accounts.service';
import { BankAccountsController } from './bank_accounts.controller';
import { SupabaseService } from 'src/service/supabase.service';
@Module({
  providers: [BankAccountsService,SupabaseService],
  controllers: [BankAccountsController]
})
export class BankAccountsModule {}
