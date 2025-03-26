import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdoptionRequestsModule } from './module/adoption_requests/adoption_requests.module';
import { AnimalsModule } from './module/animals/animals.module';
import { SupabaseService } from './service/supabase.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationsModule } from './module/authorizations/authorizations.module';
import { BankAccountsModule } from './module/bank_accounts/bank_accounts.module';
import { BreedsModule } from './module/breeds/breeds.module';
import { CategoriesModule } from './module/categories/categories.module';
import { DonationModule } from './module/donation/donation.module';
import { LocationsModule } from './module/locations/locations.module';
import { NeedsModule } from './module/needs/needs.module';
import { PrioritiesModule } from './module/priorities/priorities.module';
import { RatingsModule } from './module/ratings/ratings.module';
import { ReviewsModule } from './module/reviews/reviews.module';
import { SheltersModule } from './module/shelters/shelters.module';
import { SpeciesModule } from './module/species/species.module';
import { UserSessionsModule } from './module/user_sessions/user_sessions.module';
import { VolunteerModule } from './module/volunteer/volunteer.module';
import { WalkRequestModule } from './module/walk_request/walk_request.module';
@Module({
  
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AdoptionRequestsModule,
     AnimalsModule,
     AuthorizationsModule,
     BankAccountsModule,
     BreedsModule,
     CategoriesModule,
     DonationModule,
     LocationsModule,
     NeedsModule,
     PrioritiesModule,
     RatingsModule,
     ReviewsModule,
     SheltersModule,
     SpeciesModule,
     UserSessionsModule,
     VolunteerModule,
     WalkRequestModule], 
  providers: [SupabaseService], 
  exports: [SupabaseService],
})
export class AppModule {}
