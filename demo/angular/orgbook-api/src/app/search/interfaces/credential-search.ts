import { CredentialSet } from '@app/credential/interfaces/credential-set';
import { CredentialAddress } from '@app/credential/interfaces/credential-address';
import { CredentialAttribute } from '@app/credential/interfaces/credential-attribute';
import { CredentialName } from '@app/credential/interfaces/credential-name';
import { CredentialNamedTopic } from '@app/credential/interfaces/credential-named-topic';
import { CredentialType } from '@app/credential-type/interfaces/credential-type';

export interface CredentialSearch {
    id: number;
    create_timestamp: Date;
    update_timestamp: Date;
    effective_date: Date;
    inactive: boolean;
    latest: boolean;
    revoked: boolean;
    revoked_date: Date;
    credential_id: string;
    credential_set: CredentialSet;
    credential_type: CredentialType;
    addresses: CredentialAddress[];
    attributes: CredentialAttribute[];
    names: CredentialName[];
    topic: CredentialNamedTopic;
    related_topics: CredentialNamedTopic[];
}
