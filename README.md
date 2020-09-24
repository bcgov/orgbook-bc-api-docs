# OrgBook API

Various developer tools and documentation for using the OrgBook API as part of the Verifiable Organizations Network.

## Table of contents

- [Background](#background)
    - [What is OrgBook](#what-is-orgbook)
    - [What does the OrgBook API Offer?](#what-does-the-orgbook-api-offer)
- [Getting Started](#getting-started)
    - [Open API Specification](#open-api-specification)
    - [Documentation](#documentation)
    - [Demo](#demo)
- [Contributing](#contributing)

## Background

### What is the OrgBook?

OrgBook has been developed by the Government of British Columbia as a searchable public directory of open verifiable data about organizations legally registered in the province. Orgbook is leveraging novel blockchain-based technology, powered by the web, to help move BC into a digital economy.

The publicly available search directory can be found [here](https://www.orgbook.gov.bc.ca/en/home), however an API has also been made available to allow developers to integrate verifiable organization data search into their own applications. This repository serves as the central source of information and tools for the OrgBook API.

### What does the OrgBook API offer?

The OrgBook API offers a number of features that make it simple to integrate a fully featured verifiable organization data search into applications. Some of these features include, but are not limited to:

- Autocomplete name search
- Basic organization search
- Faceted organization search
- Organization credential verification
- Credential issuer search
- Credential type search

## Getting started

A number of resources have been set up in this repository as a guide to using the OrgBook API.

### Open API specification

As a first step, you may wish to check out the [Open API specification](https://orgbook.gov.bc.ca/api/v3/) of the OrgBook API. The production API is currently in its third version (v3) and you are encouraged to use the most up-to-date production version in your applications to avoid any issues with backward compatibility. The Open API specification is a good way to catalogue the various endpoints available and to get a preliminary understanding of API requests and responses.

### Documentation

This will likely be your main go-to guide. Please see the [documentation](./docs/README.md) for a comprehensive overview of the OrgBook API along with examples and implementation instructions for the most common scenarios.

### Demo

To see the OrgBook API in action please see the [Angular demo](./demo/README.md) that has been developed featuring the use of various endpoints to create a full-featured verifiable organization data search tool.

## Contributing

**Pull requests are always welcome!**

Please see the [contributions guide](CONTRIBUTING.md) for the repo.

You may also create an issue if you would like to suggest additional resources to include in this repository.