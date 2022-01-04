import { Issuer } from '@app/issuer/interfaces/issuer';
import { Schema } from '@app/schema/interfaces/schema';

export interface CredentialType {
    id: number;
    issuer: Issuer;
    has_logo: boolean;
    create_timestamp: Date;
    update_timestamp: Date;
    description: string;
    credential_def_id: string;
    last_issue_date: Date;
    url: string;
    schema: Schema;
}
