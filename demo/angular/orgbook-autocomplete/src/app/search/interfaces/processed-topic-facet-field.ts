import { TopicFacetField } from './topic-facet-field';

export interface ProcessedTopicFacetField extends TopicFacetField {
    tag: string;
    queryParam: any;
}
