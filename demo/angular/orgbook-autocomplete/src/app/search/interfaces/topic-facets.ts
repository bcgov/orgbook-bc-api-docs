import { TopicFacetFields } from './topic-facet-fields';
import { TopicFacetDates } from './topic-facet-dates';
import { TopicFacetQueries } from './topic-facet-queries';

export interface TopicFacets {
    fields: TopicFacetFields;
    dates: TopicFacetDates;
    queries: TopicFacetQueries;
}
