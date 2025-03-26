export interface Volunteer {
    volunteer_id: string;
    created_at: string;
    file_path: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    country: string;
    city: string;
    address: string;
    activity_status: boolean;
}

export interface Authorizations {
    id: string;
    created_at: string;
    user_name: string;
    password_hash: string;
    is_verified: boolean;
    verification_token?: string;
    reset_token?: string;
    reset_token_expiry?: string;
    registration_date: string;
}

export interface AdoptionRequests {
    adoption_id: string;
    volunteer_id: string;
    shelter_id: string;
    animal_id: string;
    status: string;
    request_date: string;
}

export interface Animals {
    animal_id: string;
    shelter_id: string;
    name: string;
    species_id: string;
    breed_id: string;
    age: number;
    weight: number;
    gender: string;
    sterilized: boolean;
    vaccinated: boolean;
    is_adopted: boolean;
    health_status: string;
    file_path: string;
}

export interface BankAccounts {
    bank_account_id: string;
    shelter_id?: string;
    volunteer_id?: string;
    type: string;
    account_number: string;
    bank_name: string;
    currency: string;
    is_active: boolean;
    created_at: string;
}

export interface Breeds {
    breed_id: string;
    breed: string;
}

export interface Categories {
    category_id: string;
    category: string;
}

export interface Donation {
    donation_id: string;
    shelter_id: string;
    volunteer_id?: string;
    need_id?: string;
    type: string;
    amount: number;
    description: string;
    created_at: string;
}

export interface Locations {
    location_id: string;
    shelter_id: string;
    address: string;
    latitude: number;
    longitude: number;
}

export interface Needs {
    need_id: string;
    category_id: string;
    shelter_id: string;
    priority_id: string;
    description: string;
}

export interface Priorities {
    priority_id: string;
    priority: string;
}

export interface Ratings {
    rating_id: string;
    created_at: string;
    reviewer_id: string;
    reviewed_type: string;
    rating: number;
    shelter_id?: string;
    volunteer_id?: string;
}

export interface Reviews {
    review_id: string;
    shelter_id: string;
    volunteer_id: string;
    rating: number;
    review_text: string;
    created_at: string;
}

export interface Shelters {
    shelter_id: string;
    file_path: string;
    shelter_name: string;
    email: string;
    country: string;
    city: string;
    address: string;
    phone: string;
    activity_status: boolean;
}

export interface Species {
    species_id: string;
    species: string;
}

export interface UserSessions {
    user_session_id: string;
    shelter_id?: string;
    volunteer_id?: string;
    ip_address: string;
    device_info: string;
    logged_in_at: string;
    last_activity: string;
}

export interface WalkRequest {
    request_id: string;
    shelter_id: string;
    volunteer_id: string;
    animal_id: string;
    status: string;
    request_date: string;
}
