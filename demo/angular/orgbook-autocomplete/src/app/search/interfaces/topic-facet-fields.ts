import { TopicFacetField } from './topic-facet-field';
import { ProcessedTopicFacetFields } from './processed-topic-facet-fields';

export interface TopicFacetFields {
    category: TopicFacetField[];
    credential_type_id: TopicFacetField[];
    issuer_id: TopicFacetField[];
}
