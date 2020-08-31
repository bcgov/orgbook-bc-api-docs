# OrgBook API (v3) Documentation

## Table of Contents

- [OrgBook API (v3) Documentation](#orgbook-api-v3-documentation)
 - [Table of Contents](#table-of-contents)
   - [DIY OrgBook BC Search Tutorial](#diy-orgbook-bc-search-tutorial)
     - [1. Getting Started](#1-getting-started)
     - [2.  Implementing Autocomplete](#2-implementing-autocomplete)
     - [3. Implementing a Topic Search](#3-implementing-a-topic-search)
   <!-- - [API Endpoints](#api-endpoints)
    - [Credential](#credential)
    - [Credential Type](#credential-type)
    - [Issuer](#issuer)
    - [Schema](#schema)
    - [Search](#search)
    - [Topic](#Topic) -->

## DIY OrgBook BC Search Tutorial

This tutorial will take you through the very steps needed to start building your own autocomplete-enabled search component for verified, legally-registered organizations within British Columbia using the OrgBook BC Open API, in your web application. The tutorial will use code examples taken from the demo Angular application implemented in this repository, however the basic concepts will apply agnostic of the web framework you choose to use (or not). Please see the documentation [here](/demo/angular/README.md) if you are interested in running the demo on your own machine. Feel free to also glance through the code if you are interested in the implementation details of the demo, otherwise you can follow along in this tutorial.

_**Note:** During the tutorial, you will see developer tips (💡) that provide implementation notes/details about the demo application, or general tips and tricks to improve your own implementation._

### 1. Getting Started

Building an autocomplete search component is a fairly simple process and really only requires a few, key,  OrgBook API resource endpoints (`/search/autocomplete` and `/search/topic`). The remaining endpoints provide auxiliary functionality to your applications.

_**Note:** Endpoints are prefixed with the relevant hostname, path, and API version (ex. `https://orgbook-test.pathfinder.gov.bc.ca/api/v3/`) but are omitted for clarity in this document._

___
💡 The demo leverages Angular Material web components and thus leaves the heavy lifting of the UI to the library.
___

### 2. Implementing Autocomplete

Autcomplete adds immediate benefits to your application as it provides an easy way to pre-emptively narrow down organization searches. The first API endpoint you will call is `/search/autocomplete`, which takes a query parameter `q`: a query string that will match the most closely related organization names in OrgBook BC. The endpoint URL (using `'abc'` as the example query string) should be formatted like:

```
/search/autocomplete?q=abc&inactive=false&revoked=false
```

The `inactive` query parameter denotes whether names of discontinued entities should be returned in the results. The `revoked` query parameter denotes whether entities with invalid credentials should be returned in the results. By default, only currently operating organizations in BC with valid BC Registries credentials are queried for.

The API response will have the following interface definition:

```
export interface AggregateAutocompleteResponse {
    total: number;
    first_index: number;
    last_index: number;
    results: AggregateAutocomplete[];
}
```

_**Note:** the type names are arbitrary to the demo, the type definition is more important here._

What you will be most interested in is the `results` field which is a list of closely matching entity names in OrgBook BC, and has the following type definition:

```
export interface AggregateAutocomplete {
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

___
💡 Each API resource in the Angular demo is accessed via an injectable service (for example, the `/search` resource is accessed via the [`SearchService`](/demo/angular/orgbook-autocomplete/src/app/search/services/search.service.ts).

In the demo, the `getAggregateAutocomplete` method performs a `GET` request to the `/search/autocomplete` endpoint. The service method in the demo is implemented as follows:

```
public getAggregateAutocomplete(q: string): Observable<AggregateAutocompleteResponse> {
  const queryParams = new HttpParams({
    fromObject: { q, inactive: 'false', revoked: 'false' }
  });

  const options = { params: queryParams };

  return this.http.get<AggregateAutocompleteResponse>('/search/autocomplete', options);
}
```

Angular provides an [`HttpClient`](https://angular.io/api/common/http/HttpClient) that uses [RxJS Observables](https://rxjs-dev.firebaseapp.com/) under the hood for making HTTP requests and ties in with the framework's change detection algorithm. A similar method can be created using any HTTP service such as the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [`axios`](https://github.com/axios/axios), or even [`XMLHTTPRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).

The `getAggregateAutocomplete` method is ultimately called as a user types text into an `<input>` element in the [SearchInputComponent](/demo/angular/orgbook-autocomplete/src/app/search/components/search-input/search-input.component.ts):

```
<input type="text" #search name="search" id="search"
  ...
  (input)="onAutocomplete(search?.value)"
  ...
  matInput [matAutocomplete]="auto" ...>
```

The `onAutocomplete` method feeds user-typed text into an Observable `BehaviorSubject`:

```
onAutocomplete(q: string): void {
  this.autocompleteTermSubject$.next(q);
}
```

This Observable emits (multicasts) the values as they are fed into it, triggering a call to the `getAggregateAutocomplete` method:

```
private autocompleteResponse$ = merge(
  ...
  this.autocompleteTermSubject$
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      ...
      switchMap(q => {
        if (!q) {
          return of({} as AggregateAutocompleteResponse);
        }
        return this.searchService.getAggregateAutocomplete(q);
      }),
      ...
    )
);
```

The results of this Observable stream are subscribed to in the [HTML template](/demo/angular/orgbook-autocomplete/src/app/search/components/search-input/search-input.component.html) and displayed:

```
vm$ = combineLatest([
  ...
  this.autocompleteResponse$,
  ...
])
  .pipe(
    map(([..., autocompleteResponse]) => ({ ..., autocompleteResponse }))
  );
```

```
<ng-container *ngIf="vm$ | async as vm">
  ...
  <mat-autocomplete #auto="matAutocomplete" ...>
    <ng-container *ngIf="vm?.autocompleteResponse">
        <mat-option *ngFor="let entry of vm?.autocompleteResponse?.results"
          [value]="entry.value">
            {{ entry?.value }}
        </mat-option>
    </ng-container>
  </mat-autocomplete>
</ng-container>
```

**Pro Tip:** You can improve performance and reduce API requests by debouncing and only executing service method calls when the text input changes. In RxJS the `debounceTime` and `distinctUntilChanged` operators will effectively block an Observable stream until a specified time has elapsed since the user stopped typing or if the value has not changed from the last request (for example, if a users types `a-b-c`, triggers an API request, then deletes `b-c` but quickly types `b-c` again, a new call will not be executed). There are a number of libraries for debouncing function calls such as [`lodash`](https://lodash.com/docs/4.17.15#debounce).

___

### 3. Implementing a Topic Search

With autocomplete implemented, it's now time to incorporate full search functionality for an organization in OrgBook BC. Calling the `/search/topic` endpoint returns comprehensive information about OrgBook BC entities, including information about entity credentials and related organization (although other endpoints provide this information as well). This is the endpoint that will likely serve the majority of needs for a basic search and takes a number of query parameters, the main one of which is `name`: a query string that will match the most closely related organization names in OrgBook BC. The endpoint URL (using `'abc'` as the example query string) should be formatted like:

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
```

<!-- ## API Endpoints

### Credential

### Credential Type

### Issuer

### Schema

### Search

### Topic -->
