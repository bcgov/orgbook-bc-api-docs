# OrgBook API (v3) Documentation

## Table of Contents

- [OrgBook API (v3) Documentation](#orgbook-api-v3-documentation)
  - [Table of Contents](#table-of-contents)
    - [DIY OrgBook BC Search Tutorial](#diy-orgbook-bc-search-tutorial)
      - [1. Getting Started](#1-getting-started)
      - [2. Performing an Autocomplete Search](#2-performing-an-autocomplete-search)
      - [3. Performing a Topic Search](#3-performing-a-topic-search)
    - [API Endpoints](#api-endpoints)
      - [Credential](#credential)
      - [Credential Type](#credential-type)
      - [Issuer](#issuer)
      - [Schema](#schema)
      - [Search](#search)
      - [Topic](#Topic)

## DIY OrgBook BC Search Tutorial

This tutorial will take you through the very steps needed to start building your own autocomplete-enabled search component for verified, legally-registered organizations within British Columbia using the OrgBook BC Open API, in your web application. The tutorial will use code examples taken from the demo Angular application implemented in this repository, however the basic concepts will apply agnostic of the web framework you choose to use (or not). Please see the documentation [here](/demo/angular/README.md) if you are interested in running the demo on your own machine. Feel free to also glance through the code if you are interested in the implementation details of the demo, otherwise you can follow along in this tutorial.

_**Note:** During the tutorial, you will see developer tips (💡) that provide implementation notes/details about the demo application, or general tips and tricks to improve your own implementation._

### 1. Getting Started

Building an autocomplete search component is a fairly simple process and really only requires a few, key,  OrgBook API endpoints (`/search/autocomplete` and `/search/topic`). The remaining endpoints provide auxilliary functionality to your applications.

_**Note:** Endpoints are prefixed with the relevant hostname, path, and API version (ex. `https://orgbook-test.pathfinder.gov.bc.ca/api/v3/`) but are ommitted for clarity in this document._

___
💡 The demo leverages Angular Material web components and thus leaves the heavy lifting of the UI to the library.
___

### 2. Performing an Autocomplete Search

Likely the first API endpoint you will call is `/search/autocomplete`, which takes a query parameter `q`: a query string that will match the most closely related organization names in OrgBook BC. The endpoint URL (using `'abc'` as the example query string) should be formatted like:

```
/search/autocomplete?q=abc&inactive=false&revoked=false
```

The `inactive` query parameter denotes whether names of discontinued entities should be returned in the results. The `revoked` query parameter denotes whether entites with invalid credentials should be returned in the results. By default, only currently operating organizations in BC with valid BC Registries credentials are queried for.

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

What you will be most interested in is the `results` field which is a list of closely matiching entity names in OrgBook BC, and has the following type definition:

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

Results are mostly returned in batches of 10 in descending search `score` order. More specific query strings will result in fewer results returned with higher search `score`s. Non-matching query strings will return empty results.

The main fields you will be interested are:
* `type`: The data field that autocomplete search is based on (example: 'name').
* `value`: The the value of the data field that autocomplete search is based on (example: 'ABC LTD.').

### 3. Performing a Topic Search

## API Endpoints

### Credential

### Credential Type

### Issuer

### Schema

### Search

### Topic