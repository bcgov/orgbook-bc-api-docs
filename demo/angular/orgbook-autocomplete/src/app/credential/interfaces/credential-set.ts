export interface CredentialSet {
    id: number;
    create_timestamp: Date;
    update_timestamp: Date;
    latest_credential_id: string;
    topic_id: string;
    first_effective_date: Date;
    last_effective_date: Date;
}
