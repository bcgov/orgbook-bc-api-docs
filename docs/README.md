# OrgBook API (v3) Documentation

This document has been created as a first reference for the OrgBook API. When you become more familiar with the basic concepts, you may want to go on to explore the [OpenAPI Specification](https://orgbook.gov.bc.ca/api/v3/) and all of the endpoints available.

## Introduction

### What is OrgBook?
OrgBook is a type of [Hyperledger Aries](https://github.com/hyperledger/aries) Verifiable Credential Registry ([Aries VCR](https://github.com/bcgov/aries-vcr)). Aries VCR is simply a set of software tools that make it easy to host and issue [verifiable credentials](https://en.wikipedia.org/wiki/Verifiable_credentials) of any type. OrgBook is a specific implementation of an Aries VCR built by the Government of British Columbia, that hosts verifiable credentials about organizations registered in the province. ___The key point to remember is that (almost) everything is a credential in OrgBook.___ Everything from an organization's registration information, to its business number and its relations to other organizations within the province, is stored as a verifiable credential in OrgBook. Credentials are issued to OrgBook from a credential issuer. OrgBook can store credentials from one or more issuers.

The OrgBook API is a RESTful interface to OrgBook. It has been purposefully built for developers to access and integrate verifiable credentials (i.e. data about registered organizations) from OrgBook into their own applications. The following documentation outlines the most common scenarios that developers are likely to use the OrgBook API for, including use cases for specific features that most will be looking to build into their applications.

## Table of contents
- [Introduction](#introduction)
- [Common scenarios](#common-scenarios)
  - [I want to get a list of credential issuers registered in OrgBook](#i-want-to-get-a-list-of-credential-issuers-registered-in-orgbook)
  - [I want to get a list of available credential types in OrgBook](#i-want-to-get-a-list-of-available-credential-types-in-orgBook)
  - [I want to build a legal name search component in my application](#i-want-to-build-a-legal-name-search-component-in-my-application)
    - [Implementation Example 1](#implementation-example-1)
  - [I want to auto-populate form fields with organization info](#i-want-to-auto-populate-form-fields-with-organization-info)
    - [Step 1. Query for a topic](#step-1-query-for-a-topic)
    - [Step 2. Query for credentials](#step-2-query-for-credentials)
    - [Implementation Example 2](#implementation-example-2)

## Common scenarios

### I want to get a list of credential issuers registered in OrgBook

To do this, make a `GET` request to the `/issuer` endpoint. The response will look something like:

```json
{
  "total": 2,
  "page_size": 10,
  "page": 1,
  "first_index": 1,
  "last_index": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "has_logo": true,
      "create_timestamp": "2020-02-14T14:27:35.624957-08:00",
      "update_timestamp": "2020-09-18T13:55:52.670973-07:00",
      "did": "HR6vs6GEZ8rHaVgjg2WodM",
      "name": "BC Corporate Registry",
      "abbreviation": "BCReg",
      "email": "bcregistries@gov.bc.ca",
      "url": "https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations/ministries/citizens-services/bc-registries-online-services",
      "endpoint": ""
    },
    ...
  ]
}
```

The results are a list of issuers that have registered with OrgBook. They may or may not have issued any credentials yet, however developers can find out what type of credentials are issued by a specific issuer, by making a `GET` request to the `issuer/{id}/credentialtype` endpoint. In the above example, the issuer with an `id` of `1` is the BC Corporate Registry which issues credentials to OrgBook corresponding to an organization's registration in the province, among others.

### I want to get a list of available credential types in OrgBook

To do this, make a `GET` request to the `/credentialtype` endpoint. The response will look something like:

```json
{
  "total": 6,
  "page_size": 10,
  "page": 1,
  "first_index": 1,
  "last_index": 6,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "issuer": { ... },
      "has_logo": true,
      "create_timestamp": "2020-02-14T14:27:35.689210-08:00",
      "update_timestamp": "2020-10-06T20:00:35.714822-07:00",
      "description": "registration.registries.ca",
      "credential_def_id": "HR6vs6GEZ8rHaVgjg2WodM:3:CL:41051:tag",
      "last_issue_date": "2020-10-06T20:00:35.714729-07:00",
      "url": "/bcreg/incorporation",
      "schema": { ... }
    },
    ...
  ]
}
```

The results are a list of credential types that issuers have indicated they will be issuing when they register with OrgBook. This doesn't necessarily mean there are any credentials of the indicated types in OrgBook, but simply that they may be issued at some point or another. For example, organization addresses are issued as a credential, however BC Registries has not currently made credentials of that type available in OrgBook.

_Note: If you are interested in seeing the structure of address credentials, the OrgBook developer team has a [non-production deployment](https://dev.orgbook.gov.bc.ca) of OrgBook with [hypothetical organizations](https://dev.orgbook.gov.bc.ca/en/organization/registration.registries.ca/BC0356343/cred/6741681) that have address credentials._

OrgBook allows one to search organizations that have been issued a specific type of credential, and a good example of this can be seen in the [Advanced Search](https://orgbook.gov.bc.ca/en/advanced-search). The list of credential types is used to populate a select input, which narrows the search down to only those organizations that have been issued a credential of the selected type. For example, one might be interested in searching for organizations that have been issued a Cannabis Retail Store License.

### I want to build a legal name search component in my application

Developers often want to include a search feature for legal names of registered BC organizations in their applications (usually to [auto-populate form inputs](#i-want-to-auto-populate-form-fields-with-organization-info)). It is so commonplace, that the OrgBook developer team created the `/search/autocomplete` endpoint.

Make a `GET` request to the `/search/autocomplete` endpoint, passing a string of characters to the `q` query parameter in the request URL. OrgBook will try to match the string of characters to names of registered organizations. For example, if you wanted to query for the name `'Power Corp'` you would format the request like: `/search/autocomplete?q=Power%20Corp`. The response will look something like:

```json
  "total": 10,
  "first_index": 1,
  "last_index": 10,
  "results": [
    {
      "type": "name",
      "value": "U3 POWER CORP.",
      "score": 122.19571,
      "topic_source_id": "BC0772006",
      "topic_type": "registration.registries.ca",
      "credential_id": "c0d330b4-bf99-4cf1-9da1-9dd7207bfd88"
    },
    {
      "type": "name",
      "value": "TRITON POWER CORP.",
      "score": 121.502174,
      "topic_source_id": "BC0205366",
      "topic_type": "registration.registries.ca",
      "credential_id": "1f77e47d-94f0-4e68-9df2-9796b4d68e1a"
    },
    {
      "type": "name",
      "value": "STOTHERT POWER CORP.",
      "score": 121.502174,
      "topic_source_id": "BC0070832",
      "topic_type": "registration.registries.ca",
      "credential_id": "ec70b489-a66b-499a-ba92-d477b1c37138"
    },
    {
      "type": "name",
      "value": "BOSS POWER CORP.",
      "score": 121.502174,
      "topic_source_id": "BC0230487",
      "topic_type": "registration.registries.ca",
      "credential_id": "fd6d822a-9ec7-4abb-96e0-c2edaaff2108"
    },
    ...
  ]
}
```

Results are returned in batches of up to 10 closely matching organization names, each with a match `score`. The results are sorted from the highest to the lowest score, therefore closer matches will be at the top of the results. OrgBook will return fewer results with higher scores, as you provide more exactly matching query strings. If OrgBook is unable to match a query string to any organization name, it will return empty results.

There are optional parameters that you can attach to the request:
* The `inactive` query parameter denotes whether inactive organizations (i.e. those with a status of `'Historical'`) should be included in the results (defaults to `'false'`).
* The `revoked` query parameter denotes whether organizations with revoked registration credentials should be returned in the results (defaults to `'false'`).

#### Implementation Example 1

> Checkout this [example](https://stackblitz.com/edit/js-uum64f) on StackBlitz for a simple implementation of an autocomplete name search using jQuery UI and plain HTML.

_Another simple approach could be to attach a `'keypress'` event listener to a text input. As a user types, requests are made to `/search/autocomplete` with the value of the input. You may want to employ techniques, like debouncing, to reduce the number of calls to the API server. Better yet, use an existing UI library that provides these features out of the box and simply pass autocomplete results to display._

### I want to auto-populate form fields with organization info

Developers often create applications that require information about registered BC organizations in their applications. For example, you could be building an application that issues a loan or a certificate only to registered BC organizations. You currently have a form with fields for an organization's name, BC Registries number, CRA business number, type, and status that need to be filled in. The OrgBook API enables you to pull this information from OrgBook credentials. You can then programmatically populate the fields in your form using the credential data.

You simply need to call a few endpoints in the OrgBook API in the following order (assuming you have already performed an [autocomplete name search](#i-want-to-build-a-legal-name-search-component-in-my-application) and are using one of the results from that request, or you know the BC Registries number of the organization you require information about):

#### Step 1. Query for a topic

Make a `GET` request to the `/search/topic` endpoint, passing in the BC Registries number (this is the `topic_source_id` field in an autocomplete result) to the `name` query parameter in the request URL.

There are optional parameters that you can attach to the request:
* The `inactive` query parameter denotes whether inactive organizations (i.e. those with a status of `'Historical'`) should be included in the results (defaults to `'false'`).
* The `revoked` query parameter denotes whether organizations with revoked registration credentials should be returned in the results (defaults to `'false'`).
* The `latest` query parameter denotes whether only the most recently issued credential(s) should be returned (defaults to `'true'`).

For example, if you wanted to query for information about `'U3 POWER CORP.'` you would format the request like: `/search/topic?name=BC0772006`. The response will look something like:

```json
{
  "total": 1,
  "page_size": 10,
  "page": 1,
  "first_index": 1,
  "last_index": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1092374,
      "create_timestamp": "2020-09-17T19:09:38.719347-07:00",
      "update_timestamp": "2020-09-17T19:09:38.746805-07:00",
      "effective_date": "2006-10-17T16:58:42-07:00",
      "inactive": false,
      "latest": true,
      "revoked": false,
      "revoked_date": null,
      "credential_id": "c0d330b4-bf99-4cf1-9da1-9dd7207bfd88",
      "credential_set": { ... },
      "credential_type": { ... },
      "attributes": [ ... ],
      "names": [ ... ],
      "topic": {
        "id": 787297,
        "create_timestamp": "2020-09-17T19:09:38.681116-07:00",
        "update_timestamp": "2020-09-17T19:09:38.681143-07:00",
        "source_id": "BC0772006",
        "type": "registration.registries.ca",
        "names": [ ... ],
        "local_name": { ... },
        "remote_name": null,
        "addresses": [],
        "attributes": [ ... ]
      },
      "related_topics": []
    },
    ...
  ]
}
```

Each of the results returned is a foundational credential for the ___topic___ you are searching for. A foundational credential is generated when an organization is first registered in OrgBook. All other credentials for this organization are then linked (related to) this credential. It is possible to receive more than 1 foundational credential back from this query (especially for those belonging to related organizations). Results are returned in pages of up to 10 closely matching entities to the name you provide in the query. Typically you would iterate through the results and find the first credential where the `source_id` under the `topic` field matches the BC Registries number you passed in the name query.

#### Step 2. Query for credentials

Locate the `topic` field from the previous result and, within that, locate the `id` field. The topic id can be used to obtain all OrgBook credentials for an organization of interest.

Make a `GET` request to the `/search/credential` endpoint, passing in the topic id from the topic search result to the `topic_id` query parameter in the request URL.

The same optional parameters for the `/search/topic` endpoint can be attached to the request.

For example, if you wanted to query for all of the credentials of `'U3 POWER CORP.'` you would format the request like: `/search/credentials?topic_id=787297`. The response looks almost identical to the topic search, except all credentials are returned for this one organization:

```json
{
  "total": 2,
  "page_size": 10,
  "page": 1,
  "first_index": 1,
  "last_index": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1092374,
      "create_timestamp": "2020-09-17T19:09:38.719347-07:00",
      "update_timestamp": "2020-09-17T19:09:38.746805-07:00",
      "effective_date": "2006-10-17T16:58:42-07:00",
      "inactive": false,
      "latest": true,
      "revoked": false,
      "revoked_date": null,
      "credential_id": "c0d330b4-bf99-4cf1-9da1-9dd7207bfd88",
      "credential_set": { ... },
      "credential_type": {
        "id": 1,
        "issuer": { ... },
        "has_logo": true,
        "create_timestamp": "2020-09-16T11:17:48.917070-07:00",
        "update_timestamp": "2020-09-23T17:33:09.918448-07:00",
        "description": "registration.registries.ca",
        "credential_def_id": "9vnQTCy6NQ7mxUVhLtaPZY:3:CL:39771:default",
        "last_issue_date": "2020-09-23T08:51:02.884222-07:00",
        "url": "/bcreg/incorporation",
        "schema": { ... }
      },
      "addresses": [],
      "attributes": [
        ...
        {
          "id": 7464375,
          "type": "entity_status",
          "format": "category",
          "value": "ACT",
          "credential_id": 1092374
        },
        ...
        {
          "id": 7464377,
          "type": "entity_type",
          "format": "category",
          "value": "BC",
          "credential_id": 1092374
        },
        ...
      ],
      "names": [
        {
          "id": 1067982,
          "text": "U3 POWER CORP.",
          "language": null,
          "credential_id": 1092374,
          "type": "entity_name"
        }
      ],
      "topic": { ... },
      "related_topics": []
    },
    {
      "id": 2888463,
      "create_timestamp": "2020-09-23T22:31:49.875342-07:00",
      "update_timestamp": "2020-09-23T22:31:49.934100-07:00",
      "effective_date": "2006-10-17T16:58:42-07:00",
      "inactive": false,
      "latest": true,
      "revoked": false,
      "revoked_date": null,
      "credential_id": "73ae94b1-3582-41c2-8076-eceabfe20ae8",
      "credential_set": { ... },
      "credential_type": {
        "id": 4,
        "issuer": { ... },
        "has_logo": true,
        "create_timestamp": "2020-09-16T11:17:49.057504-07:00",
        "update_timestamp": "2020-09-24T10:48:42.356094-07:00",
        "description": "business_number.registries.ca",
        "credential_def_id": "9vnQTCy6NQ7mxUVhLtaPZY:3:CL:39777:default",
        "last_issue_date": "2020-09-24T10:48:42.355926-07:00",
        "url": "/bcreg/address",
        "schema": { ... }
      },
      "addresses": [],
      "attributes": [
        {
          "id": 15367395,
          "type": "business_number",
          "format": "attribute",
          "value": "000760180",
          "credential_id": 2888463
        }
      ],
      "names": [],
      "topic": { ... },
      "related_topics": []
    },
    ...
  ]
}
```

Two credentials have been returned in the results. Locating the `credential_type` field, the `description` indicates that one of the credentials is of the type `'registration.registries.ca'` and the other is of the type `'business_number.registries.ca'`.

The first credential contains registration information about the organization. The list of `attributes` contains various fields, such as `'entity_status'`, `'entity_type'` and others. The registration credential attributes for this organization indicate that this is an Active, BC Company.

In another unrelated example, the following attribute list tells us that the organization is an Active, Sole Proprietorship within British Columbia:

```json
"attributes": [
    {
        "id": ...,
        "type": "entity_status",
        "format": "category",
        "value": "ACT",
        "credential_id": ...,
        "credential_type_id": 1
    },
    {
        "id": ...,
        "type": "entity_type",
        "format": "category",
        "value": "SP",
        "credential_id": ...,
        "credential_type_id": 1
    },
    {
        "id": ...,
        "type": "home_jurisdiction",
        "format": "jurisdiction",
        "value": "BC",
        "credential_id": ...,
        "credential_type_id": 1
    }
]
```

The second credential contains information about the organization's business number, issued by the Canada Revenue Agency for tax purposes. There is only a single attribute for the `'business_number'`. The `'value'` is the business number itself.

Together these credentials can be used to programmatically fill in form fields in an application.

#### Implementation Example 2

> Checkout this [example](https://stackblitz.com/edit/js-y5jxtf) on StackBlitz for a simple implementation of auto-populating a form from OrgBook credentials using jQuery UI and plain HTML.