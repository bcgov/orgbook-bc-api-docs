[![Lifecycle:Stable](https://img.shields.io/badge/Lifecycle-Stable-97ca00)]('')

# OrgBook API

Various developer tools and documentation for using the OrgBook API as part of the Verifiable Organizations Network.

## Table of contents

- [Background](#background)
    - [What is OrgBook](#what-is-orgbook)
    - [What does the OrgBook API Offer?](#what-does-the-orgbook-api-offer)
- [Getting Started](#getting-started)
    - [Documentation](#documentation)
    - [Open API Specification](#open-api-specification)
    - [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Background

### What is OrgBook?

OrgBook has been developed by the Government of British Columbia as a searchable public directory of open verifiable data about organizations legally registered in the province. Orgbook is leveraging novel blockchain-based technology, powered by the web, to help move BC into a digital economy.

The publicly available search directory can be found [here](https://www.orgbook.gov.bc.ca/en/home), however an API has also been made available to allow developers to integrate various OrgBook features into their own applications. This repository serves as the central source of information and tools for the API.

### What does the OrgBook API offer?

The OrgBook API exposes a number of RESTful endpoints that make it simple to integrate publicly available, verifiable data about registered organizations into your applications. Some of the features that are available through the API include, but are not limited to:

- Autocomplete-enabled organization name search
- Organization data retrieval, in the form of verifiable credentials (including registration number, business number, entity type, entity status, etc.)
- Credential issuer search
- Credential type search
- Credential verification

## Getting started

A number of resources have been set up in this repository as a guide to using the OrgBook API.

### Documentation

If you are just starting out, this should be your main go-to guide. Please see the [documentation](./docs/README.md) for a comprehensive overview of the OrgBook API along with examples and implementation instructions for the most common application use cases.

### Open API specification

You may wish to check out the [Open API specification](https://orgbook.gov.bc.ca/api/v3/) if you are interested in a deeper look into a catalogue of all the endpoints available. You are encouraged to use the most up-to-date production version (v3) of the API in your applications to avoid any issues with backward compatibility.

### Demo

To see the OrgBook API in action, please see a [demo](./demo/README.md) that has been developed featuring the use of various endpoints to create a full-featured verifiable organization data search tool.

## Contributing

**Pull requests are always welcome!**

Please see the [contributions guide](CONTRIBUTING.md) for the repo.

You may also create an issue if you would like to suggest additional resources to include in this repository.

## License

[Apache License Version 2.0](./LICENSE)