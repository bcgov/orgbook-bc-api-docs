import { CredentialName } from './credential-name'
import { CredentialAddress } from './credential-address';
import { TopicAttribute } from '@app/topic/interfaces/topic-attribute';

export interface CredentialTopicExt {
    id: number;
    create_timestamp: Date;
    update_timestamp: Date;
    source_id: string;
    type: string;
    names: CredentialName[];
    local_name: CredentialName;
    remote_name: CredentialName;
    addresses: CredentialAddress[]
    attributes: TopicAttribute[]
}
