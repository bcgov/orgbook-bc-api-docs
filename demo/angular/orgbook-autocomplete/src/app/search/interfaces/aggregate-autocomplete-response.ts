import { AggregateAutocomplete } from "./aggregate-autocomplete";

export interface AggregateAutocompleteResponse {
    total: number;
    first_index: number;
    last_index: number;
    results: AggregateAutocomplete[];
}
