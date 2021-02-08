import { CredentialSet } from '@app/credential/interfaces/credential-set';
import { CredentialType } from '@app/credential-type/interfaces/credential-type';
import { CredentialAttribute } from '@app/credential/interfaces/credential-attribute';
import { CredentialName } from '@app/credential/interfaces/credential-name';
import { CredentialTopicExt } from '@app/credential/interfaces/credential-topic-ext';
import { CredentialNamedTopic } from '@app/credential/interfaces/credential-named-topic';

export interface CredentialTopicSearch {
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
    attributes: CredentialAttribute[];
    names: CredentialName[];
    topic: CredentialTopicExt;
    related_topics: CredentialNamedTopic[];
}
