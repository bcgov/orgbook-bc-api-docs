export interface TopicResponse {
    total: number
    page_size: number;
    page: number;
    first_index: number;
    next: string;
    previous: string;
    results: any[];
}
