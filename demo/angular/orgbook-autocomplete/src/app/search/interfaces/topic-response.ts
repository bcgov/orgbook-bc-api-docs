import { CredentialTopicSearch } from '@app/credential/interfaces/credential-topic-search';

export interface TopicResponse {
    total: number;
    page_size: number;
    page: number;
    first_index: number;
    next: string;
    previous: string;
    results: CredentialTopicSearch[];
}
