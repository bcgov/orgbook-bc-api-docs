import { TopicFacets } from './topic-facets';
import { TopicResponse } from './topic-response';

export interface TopicFacetsResponse {
    facets: TopicFacets;
    objects: TopicResponse;
}
