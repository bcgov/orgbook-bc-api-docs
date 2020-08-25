import { CredentialSearch } from './credential-search';

export interface CredentialResponse {
    total: number;
    page_size: number;
    page: number;
    first_index: number;
    last_index: number;
    next: string;
    previous: string;
    results: CredentialSearch[];
}
