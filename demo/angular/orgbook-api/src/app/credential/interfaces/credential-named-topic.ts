import { CredentialName } from './credential-name';

export interface CredentialNamedTopic {
    id: number;
    create_timestamp: Date;
    update_timestamp: Date;
    source_id: string;
    type: string;
    names: CredentialName[];
    local_name: CredentialName;
    remote_name: CredentialName;
}
