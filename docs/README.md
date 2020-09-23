# OrgBook API (v3) Documentation

Documentation for OrgBook API usage.

## Table of contents
- [Common scenarios](#common-scenarios)
  - [Name search with autocomplete](#name-search-with-autocomplete)
  - [Basic organization search](#basic-organization-search)
  - [Faceted organization search](#faceted-organization-search)
  - [Verifiable organization credential retrieval](#verifiable-organization-credential-retrieval)
  - [Credential issuer search](#credential-issuer-search)
  - [Credential type search](#credential-type-search)

## Common scenarios

This section goes through some of the most common use cases for the OrgBook API and offers some implementation guides for each of the scenarios.

_If you would like to see how some of these features are implemented in a real application, feel free to check out the  [Angular demo](/demo/README.md)._

### Name search with autocomplete

This is likely to be the most popular use case of the OrgBook API, giving you the ability to create a name lookup feature in your application for legally registered organizations, with autocomplete functionality.

The `/search/autocomplete` path has been created specifically for this.

`/search/autocomplete` takes a query parameter, `q`: a query string that will match the most closely related organization names in OrgBook. There are a few other query parameters (described below) that can also be provided, but are not required since default values are used when these query parameters are not included.

Example (using `'abc'` as the query string):

```
/search/autocomplete?q=abc&inactive=false&revoked=false
```

The `inactive` query parameter denotes whether names of discontinued entities should be returned in the results. The `revoked` query parameter denotes whether entities with invalid credentials should be returned in the results. By default, only currently operating organizations with valid credentials are queried for.

The API response will look something like this type definition:

_**Note:** the type names are arbitrary, the type definition is more important here._

```
interface AggregateAutocompleteResponse {
    total: number;
    first_index: number;
    last_index: number;
    results: AggregateAutocomplete[];
}
```
What you will be most interested in is the `results` field which is a list of closely matching entity names in OrgBook BC, and has the following type definition:

```
interface AggregateAutocomplete {
    type: string;
    value: string;
    score: number;
    topic_source_id: string;
    topic_type: string;
    credential_id: string;
}
```

Results are mostly returned in batches of up to 10 in descending search `score` order. More specific query strings will result in fewer results returned with higher search `score`s. Non-matching query strings will return empty results.
The main fields you will be interested are:
* `type`: The data field that autocomplete search is based on (example: 'name').
* `value`: The value of the data field that autocomplete search is based on (example: 'ABC LTD.').

> Checkout this [example](https://stackblitz.com/edit/js-uum64f?file=index.js) on Stackblitz for a simple implementation using jQuery and plain HTML.

### Basic organization search
### Faceted organization search
### Verifiable organization credential retrieval
### Credential issuer search
### Credential type search

<!-- ### 3. Implementing a topic search

With autocomplete implemented, it's now time to incorporate full search functionality for an organization in OrgBook BC. Calling the `/search/topic` endpoint returns comprehensive information about OrgBook BC entities, including information about entity credentials and related organizations (although other endpoints provide this information as well). This is the endpoint that will likely serve the majority of needs for a basic search and takes a number of query parameters, the main one of which is `name`: a query string that will match the most closely related organization names in OrgBook BC. The endpoint URL (using `'abc'` as the example query string) should be formatted like:

```
/search/topic?name=abc&inactive=false&latest=true&revoked=false
```

In similar fashion to `/search/autocomplete`, the `inactive` query parameter denotes whether names of discontinued entities should be returned in the results. The `revoked` query parameter denotes whether entities with invalid credentials should be returned in the results. Since this endpoint also returns entity credentials, the `latest` query parameter denotes whether only the most recent credentials should be returned. By default, only currently operating organizations in BC with the latest valid BC Registries credentials are queried for.

The API response will have the following interface definition:

```
export interface TopicResponse {
    total: number;
    page_size: number;
    page: number;
    first_index: number;
    last_index: number;
    next: string;
    previous: string;
    results: CredentialTopicSearch[];
}
```

In similar fashion to `/search/autocomplete`, results are returned in pages of up to 10 similarly matching entities to the name query (the number of results in the current response are indicated in the `page_size` field). The `total` field will indicate whether there are more results available than what's in the current page, and if so, `next` and `previous` URLs will be included in the response for accessing the next or previous pages of results, respectively. More specific query strings will result in fewer results and pages returned. Non-matching query strings will return empty pages.

The `results` field is a list of closely or exactly matching entities in OrgBook BC, and has the following type definition:

```
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
```

_**Note:** The result here is actually a credential that is being returned by the API._

The `inactive`, `latest`, `revoked` and `revoked_date` fields are self explanatory. `effective_date` indicates when the credential was activated.

_**Note:** `effective_date` is not the same as incorporation/registration date. It simply denotes the last time BC Registries created a credential for this entity._

Information about the organization is found in the `topic` field, which has the following type definition:

```
export interface CredentialTopicExt {
    id: number;
    create_timestamp: Date;
    update_timestamp: Date;
    source_id: string;
    type: string;
    names: CredentialName[];
    local_name: CredentialName;
    remote_name: CredentialName;
    addresses: CredentialAddress[];
    attributes: TopicAttribute[];
}
```

You'll notice that it contains many of the same fields as the top-level response, with some additions, such as `source_id` (the unique business number generated for the organization when it was registered in British Columbia), `addresses` and `local_name`.

The `names` field contains the operating business names and has the following type definition (with `type` typically being 'entity_name'):

```
export interface CredentialName {
    id: number;
    text: string;
    language: string;
    credential_id: string;
    type: string;
}
```

The `attributes` field contains a list of informational attributes about the entity such as 'registration_date', 'entity_name_effective', 'entity_status', 'entity_status_effective', 'entity_type', 'home_jurisdiction', and 'reason_description'. It has the following type definition:

```
export interface TopicAttribute {
    id: number;
    type: string;
    format: string;
    value: string;
    credential_id: string;
    credential_type_id: string;
}
``` -->