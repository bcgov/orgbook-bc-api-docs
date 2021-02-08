export interface Topic {
    id: number;
    create_timestamp: Date;
    update_timestamp: Date;
    source_id: string;
    type: string;
    related_to: number[];
    related_from: number[];
}
