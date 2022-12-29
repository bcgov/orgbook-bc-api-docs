# Guide to using the OrgBook BC API

This document has been created as a first reference for the OrgBook BC API. When you become more familiar with the basic concepts, you may want to go on to explore the various Open API specifications (specifically [v3](https://orgbook.gov.bc.ca/api/v3/) and [v4](https://orgbook.gov.bc.ca/api/v4/)) and all of the endpoints available. You are encouraged to use the most up-to-date production version ([v4](https://orgbook.gov.bc.ca/api/v4/)) of the API in your applications to avoid any issues with backward compatibility.

## Introduction

### What is OrgBook BC?
OrgBook BC (or OrgBook for short) is a type of [Hyperledger Aries](https://github.com/hyperledger/aries) Verifiable Credential Registry ([Aries VCR](https://github.com/bcgov/aries-vcr)). Aries VCR is a set of software tools that make it easy to host and issue [verifiable credentials](https://en.wikipedia.org/wiki/Verifiable_credentials) of any type. OrgBook is a specific implementation of an Aries VCR built by the Government of British Columbia, that hosts verifiable credentials about organizations registered in the province. _The key point to remember is that (almost) everything is a credential in OrgBook._ Everything from an organization's registration information, to its business number and its relations to other organizations within the province, is stored as a verifiable credential in OrgBook. Credentials are issued to OrgBook by various authorized credential issuers that register themselves with OrgBook.

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
    - [I want to search for Organizations with a specific credential](#i-want-to-search-for-organizations-with-a-specific-credential)

## Common scenarios

### I want to get a list of credential issuers registered in OrgBook

To do this, make a `GET` request to the `/v4/issuer` endpoint. The response will look something like:

>! SUMMARY: **JSON**
```json
{
  "total": 5,
  "page_size": 10,
  "page": 1,
  "first_index": 1,
  "last_index": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "has_logo": true,
      "create_timestamp": "2020-02-14T14:27:35.624957-08:00",
      "update_timestamp": "2021-12-17T12:10:41.271874-08:00",
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

The results are a list of credential issuers that have registered with OrgBook. They may or may not have issued any credentials to OrgBook yet. In the above example, the issuer with an `id` of `1` is the BC Corporate Registry which issues credentials to OrgBook that have to do with to an organization's registration in the province, among others. Developers can find out what type of credentials are issued by a specific issuer, by making a `GET` request to the `/v4/credential-type` endpoint (see below).

### I want to get a list of available credential types in OrgBook

To do this, make a `GET` request to the `/v4/credential-type` endpoint. The response will look something like:

>! SUMMARY: **JSON**
```json
{
  "total": 9,
  "page_size": 10,
  "page": 1,
  "first_index": 1,
  "last_index": 9,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "issuer": { ... },
      "has_logo": true,
      "create_timestamp": "2020-02-14T14:27:35.689210-08:00",
      "update_timestamp": "2022-01-04T08:00:28.364836-08:00",
      "description": "registration.registries.ca",
      "credential_def_id": "HR6vs6GEZ8rHaVgjg2WodM:3:CL:41051:tag",
      "last_issue_date": "2022-01-04T08:00:28.364734-08:00",
      "url": "/bcreg/incorporation",
      "credential_title": null,
      "schema_label": {
        "translations": {
          "en": {
            "label": "Registration",
            "description": "Registration Credential"
          }
        }
      },
      "claim_labels": {
        "entity_name": {
          "en": "Name"
        },
        "entity_type": {
          "en": "Registration Type"
        },
        "expiry_date": {
          "en": "Credential Expiry Date"
        },
        "entity_status": {
          "en": "Registration Status"
        },
        "effective_date": {
          "en": "Credential Effective Date"
        },
        "registration_id": {
          "en": "Registration ID"
        },
        "entity_name_trans": {
          "en": "Translated Name"
        },
        "home_jurisdiction": {
          "en": "Home Jurisdiction"
        },
        "registration_date": {
          "en": "Registration Date"
        },
        "reason_description": {
          "en": "Reason"
        },
        "entity_name_assumed": {
          "en": "Assumed Name"
        },
        "entity_name_effective": {
          "en": "Name Effective Date"
        },
        "entity_status_effective": {
          "en": "Status Effective Date"
        },
        "registered_jurisdiction": {
          "en": "Registered Jurisdiction"
        },
        "registration_expiry_date": {
          "en": "Registration Expiry Date"
        },
        "entity_name_trans_effective": {
          "en": "Translated Name Effective Date"
        },
        "entity_name_assumed_effective": {
          "en": "Assumed Name Effective Date"
        },
        "registration_renewal_effective": {
          "en": "Registration Renewal Effective"
        },
        "extra_jurisdictional_registration": {
          "en": "Extra-Jurisdictional Registration"
        }
      }
    },
    ...
  ]
}
```

The results are a list of credential types that are currently registered in OrgBook. This doesn't necessarily mean there are any credentials of the registered types in OrgBook, but simply that these are the types of credentials that OrgBook knows about and will accept from issuers. For example, organization addresses are a type of credential registered in OrgBook, however BC Registries (the registered credential issuer of that type) has not currently made those credentials available in OrgBook (i.e. they have not issued any credentials of that type to OrgBook).

As an update to version `v4` of the API, credential types now _optionally_ have localization labels and descriptions for the credential type name (specified in the `schema_label` object) and/or credential type attributes (specified in the `claim_labels` object). These labels can be useful for multi-lingual applications or for providing human readable field names, however they must be defined by issuers when registering credential types with OrgBook and are therefore not always guaranteed to be present.

### I want to build a legal name search component in my application

Developers often want to include a search feature for the legal names of registered BC organizations in their applications (usually to [auto-populate form inputs](#i-want-to-auto-populate-form-fields-with-organization-info)). It is so commonplace, that the OrgBook developer team created the `/v3/search/autocomplete` endpoint.

Make a `GET` request to the `/v3/search/autocomplete` endpoint, passing a string of characters to the `q` query parameter in the request URL. OrgBook will try to match the string of characters to names of registered organizations.

>! EXAMPLE: If you wanted to query for the name `'Power Corp'` you would format the request like:
```
/v3/search/autocomplete?q=Power%20Corp
```
The response will look something like:
```json
{
  "total": 10,
  "first_index": 1,
  "last_index": 10,
  "results": [
    {
      "type": "name",
      "sub_type": "entity_name",
      "value": "U3 POWER CORP.",
      "topic_source_id": "BC0772006",
      "topic_type": "registration.registries.ca",
      "credential_type": "registration.registries.ca",
      "credential_id": "d759d210-628a-4a02-9da3-506cb253ee6c",
      "score": 59.46851
    },
    {
      "type": "name",
      "sub_type": "entity_name",
      "value": "STOTHERT POWER CORP.",
      "topic_source_id": "BC0070832",
      "topic_type": "registration.registries.ca",
      "credential_type": "registration.registries.ca",
      "credential_id": "70bfb05d-a4a7-4dc9-8e82-037f9eeb90ef",
      "score": 59.150566
    },
    {
      "type": "name",
      "sub_type": "entity_name",
      "value": "UNIVERSAL POWER CORP.",
      "topic_source_id": "BC0334496",
      "topic_type": "registration.registries.ca",
      "credential_type": "registration.registries.ca",
      "credential_id": "ab583755-b031-46a2-ab38-1f4b0644d817",
      "score": 59.150566
    },
    ...
  ]
}
```

Results are returned in pages of up to 10 closely matching organization names, each with a match `score`. The results are sorted from the highest to the lowest score, therefore closer matches will be at the top of the results. OrgBook will return fewer results with higher match scores (i.e. the more closely a query string matches, the fewer names it will match to). If OrgBook is unable to match a query string to any organization name, it will return empty results.

As an update to version `v3` of the API, autocomplete also supports querying/autocompletion on 9-digit CRA Business Number and BC Registration Numbers.

>! EXAMPLE: When using `'BC11'` as the query string, the following results are returned:
>
```json
{
  "total": 10,
  "first_index": 1,
  "last_index": 10,
  "results": [
    {
      "type": "name",
      "sub_type": "entity_name",
      "value": "1133(BC) ENGINEERING",
      "topic_source_id": "FM0530375",
      "topic_type": "registration.registries.ca",
      "credential_type": "registration.registries.ca",
      "credential_id": "fb87ceb3-cba7-4e42-9c54-acb18aa850e0",
      "score": 7.4135065
    },
    ...,
    {
      "topic_source_id": "BC1112195",
      "type": "topic",
      "sub_type": "source_id",
      "value": "BC1112195",
      "topic_type": "registration.registries.ca",
      "credential_type": "registration.registries.ca",
      "credential_id": "adc136ed-23b7-4d97-b3b9-8c9f633aacbb",
      "score": 2.4997532
    },
    ...
  ]
}
```
>
Here we can see that not only did the query string match a company name (indicated by the `type`: `'name'`) but it also matched a registration number (indicated by the `type`: `'topic'`) The `sub_type` further indicates what credential attribute (if any) the query string matched with.

There are optional parameters that you can attach to the request:

* The `inactive` query parameter denotes whether inactive organizations (i.e. those with a status of `'Historical'`) should be included in the results (defaults to `'false'`).
* The `revoked` query parameter denotes whether organizations with revoked registration credentials should be returned in the results (defaults to `'false'`).

#### Implementation Example 1

> TLDR: **See it in action!**
Checkout an example on StackBlitz for a simple implementation of an autocomplete name search using jQuery UI and plain HTML.
>
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-uum64f)

> TIP: Another simple approach could be to attach a `'keypress'` event listener to a text input. As a user types, requests are made to `/v3/search/autocomplete` with the value of the input. You may want to employ techniques, like debouncing, to reduce the number of calls to the API server. Better yet, use an existing UI library that provides these features out of the box and simply pass autocomplete results to display.

### I want to auto-populate form fields with organization info

Developers often create applications that require information about registered BC organizations in their applications. For example, you could be building an application that issues a loan or a certificate only to registered BC organizations. You currently have a form with fields for an organization's name, BC Registries number, CRA business number, type, and status that need to be filled in. The OrgBook API enables you to pull this information from OrgBook credentials. You can then programmatically populate the fields in your form using the credential data.

You simply need to call a few endpoints in the OrgBook API in the following order (assuming you have already performed an [autocomplete name search](#i-want-to-build-a-legal-name-search-component-in-my-application) and are using one of the results from that request, or you know the BC Registries number of the organization you require information about):

#### Step 1. Query for a topic

Make a `GET` request to the `/v4/search/topic` endpoint, passing in the BC Registries number (this is the `topic_source_id` field in an autocomplete result) to the `q` query parameter in the request URL.

There are optional parameters that you can attach to the request:

* The `inactive` query parameter denotes whether inactive organizations (i.e. those with a status of `'Historical'`) should be included in the results (defaults to `'false'`).
* The `revoked` query parameter denotes whether organizations with revoked registration credentials should be returned in the results (defaults to `'false'`).
* The `latest` query parameter denotes whether only the most recently issued credential(s) should be returned (defaults to `'true'`).

>! EXAMPLE: If you wanted to query for information about `'U3 POWER CORP.'` you would format the request like: 
```
/v4/search/topic?q=BC0772006`
```
The response will look something like:
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
      "id": 785314,
      "source_id": "BC0772006",
      "type": "registration.registries.ca",
      "names": [ ... ],
      "addresses": [],
      "attributes": [ ... ],
      "credential_set": { ... },
      "credential_type": { ... },
      "inactive": false,
      "revoked": false,
      "effective_date": "2006-10-17T16:58:42-07:00",
      "revoked_date": null
    }
  ]
}
```

Each of the results returned is a foundational credential for the _topic_ you are searching for. A foundational credential is generated when an organization is first registered in OrgBook. All other credentials for this organization are then linked (related to) this credential. It is possible to receive more than 1 foundational credential back from this query (especially for those belonging to related organizations). Results are returned in pages of up to 10 closely matching organizations to the query string you provide. Typically you would iterate through the results and find the first credential where the `source_id` matches the BC Registries number you passed as the query string.

#### Step 2. Query for credentials

Locate the `id` field from the previous result. The topic `id` can be used to obtain all credentials for an organization of interest from OrgBook.

Make a `GET` request to the `/v4/topic/{id}/credential-set` endpoint, substituting the `{id}` URL parameter with the topic `id` from the previous topic search.

>! EXAMPLE: If you wanted to query for all of the credentials of `'U3 POWER CORP.'` you would format the request like:
```
/v4/topic/785314/credential-set
```
This endpoint will return every credential issued to the organization, including revoked credentials:
```json
[
  {
    "id": 784566,
    "create_timestamp": "2021-08-18T17:14:21.673415+00:00",
    "update_timestamp": "2021-08-18T17:14:21.673430+00:00",
    "latest_credential_id": 1092967,
    "first_effective_date": "2006-10-17T23:58:42+00:00",
    "last_effective_date": null,
    "credentials": [
      {
        "id": 1092967,
        "credential_type": {
          "id": 1,
          "issuer": { ... },
          "has_logo": true,
          "create_timestamp": "2021-08-17T15:20:47.965162-07:00",
          "update_timestamp": "2022-01-04T09:31:17.517878-08:00",
          "description": "registration.registries.ca",
          "credential_def_id": "6D2evN7HsKjz7dy2xSaYoJ:3:CL:341:default",
          "last_issue_date": "2022-01-04T09:31:17.517769-08:00",
          "url": "/bcreg/incorporation",
          "credential_title": null,
          "highlighted_attributes": null,
          "schema_label": { ... },
          "schema": { ... }
        },
        "credential_id": "d759d210-628a-4a02-9da3-506cb253ee6c",
        "credential_def_id": "6D2evN7HsKjz7dy2xSaYoJ:3:CL:341:default",
        "effective_date": "2006-10-17T16:58:42-07:00",
        "inactive": false,
        "latest": true,
        "revoked": false,
        "revoked_date": null,
        "revoked_by": null,
        "attributes": [
          ...,
          {
            "id": 7468700,
            "type": "entity_status",
            "format": "category",
            "value": "ACT"
          },
          ...,
          {
            "id": 7468702,
            "type": "entity_type",
            "format": "category",
            "value": "BC"
          },
          ...
        ],
        "names": [ ... ]
      }
    ]
  },
  {
    "id": 2403978,
    "create_timestamp": "2021-08-19T07:53:47.085574+00:00",
    "update_timestamp": "2021-08-19T07:53:47.085589+00:00",
    "latest_credential_id": 2876919,
    "first_effective_date": "2006-10-17T23:58:42+00:00",
    "last_effective_date": null,
    "credentials": [
      {
        "id": 2876919,
        "credential_type": {
          "id": 4,
          "issuer": { ... },
          "has_logo": true,
          "create_timestamp": "2021-08-17T15:20:47.991055-07:00",
          "update_timestamp": "2022-01-04T09:31:18.136136-08:00",
          "description": "business_number.registries.ca",
          "credential_def_id": "6D2evN7HsKjz7dy2xSaYoJ:3:CL:347:default",
          "last_issue_date": "2022-01-04T09:31:18.136071-08:00",
          "url": "/bcreg/address",
          "credential_title": null,
          "highlighted_attributes": null,
          "schema_label": { ... },
          "schema": { ... }
        },
        "credential_id": "0b77e1ea-cc29-41ce-b770-380e35e49508",
        "credential_def_id": "6D2evN7HsKjz7dy2xSaYoJ:3:CL:347:default",
        "effective_date": "2006-10-17T16:58:42-07:00",
        "inactive": false,
        "latest": true,
        "revoked": false,
        "revoked_date": null,
        "revoked_by": null,
        "attributes": [
          {
            "id": 15297356,
            "type": "business_number",
            "format": "attribute",
            "value": "000760180"
          }
        ],
        "names": [ ... ]
      }
    ]
  }
]
```
Two sets of credentials have been returned in the results. Each credential set is a list of credentials of a given type. This list will contain both valid and revoked credentials in the order they were issued to OrgBook. Each credential contains the `credential_type` it corresponds to. For example, locating the `description` field in the first credential of the first set, indicates that this credential is of type `'registration.registries.ca'` type. The first credential of the second set is of the type `'business_number.registries.ca'`.
>
You will most likely only care about non-revoked credentials and will likely want to reduce or flatten the sets down to a single list of those non-revoked credentials.
>
The first credential of interest contains registration information about the organization. The list of `attributes` contains various fields, such as `'entity_status'`, `'entity_type'` and others. The registration credential attributes for this organization indicate that this is an Active, BC Company.
>
The second credential of interest contains information about the organization's business number, issued by the Canada Revenue Agency for tax purposes. There is only a single attribute for the `'business_number'`. The `'value'` is the business number itself.
>
Together these credentials can be used to programmatically fill in form fields in an application.

>! EXAMPLE: In another unrelated example, the following attribute list tells us that the organization is an Active, Sole Proprietorship within British Columbia:
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


> TIP: Credential sets are also useful for generating a timeline of credentials issued to and/or revoked from an organization. It is in fact what is used to generate OrgBook's credential timeline. For example, check out: [https://orgbook.gov.bc.ca/entity/BC1162838](https://orgbook.gov.bc.ca/entity/BC1162838).

#### Implementation Example 2

> TLDR: **See it in action!**
Checkout an example on StackBlitz for a simple implementation of auto-populating a form from OrgBook credentials using jQuery UI and plain HTML.
>
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-y5jxtf)

### I want to search for Organizations with a specific credential

Suppose you are the Cannabis Permit Issuer website and you want to offer a search capability on your site based on OrgBook. As such, you ONLY want to return matching results of entities that have licenses issued by your group.

This is, in fact, a very simple operation so long as you know the ID of the credential type(s) you want searches to be based on.

To find out what credential types are in OrgBook refer to the documentation above on: [I want to get a list of available credential types in OrgBook](#i-want-to-get-a-list-of-available-credential-types-in-orgBook).

Suppose, in this case, you want to limit searches to organizations that have a Cannabis Retail Store License. The ID for this credential type in OrgBook is `4`.

Now all you have to do is construct the [topic search](#step-1-query-for-a-topic) URL with the `credential_type_id` query parameter included and set to a value of `4`.

>! EXAMPLE: If you wanted to query for all organizations with a Cannabis Retail Store License you would format the request like:
```
/v4/search/topic?credential_type_id=4
```
The response will now only contain results that have credentials with that type. You can refine searches further, using the techniques described above.
