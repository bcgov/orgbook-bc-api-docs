import { CredentialAttribute } from './credential-attribute';

export interface Credential {
    topic: number;
    credential_set: number;
    credential_type: number;
    credential_id: string;
    credential_def_id: string;
    cardinality_hash: string;
    effective_date: Date;
    inactive: boolean;
    latest: boolean;
    revoked: boolean;
    revoked_date: Date;
    revoked_by: number;
    related_topics: number[];
    attributes: CredentialAttribute[];
}
