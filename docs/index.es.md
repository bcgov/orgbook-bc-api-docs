[![Lifecycle:Stable](https://img.shields.io/badge/Lifecycle-Stable-97ca00)]('')

# OrgBook BC API (ES)

Various developer tools and documentation for using the OrgBook BC API as part of the Verifiable Organizations Network.

## Table of contents

- [Background](#background)
    - [What is OrgBook](#what-is-orgbook-bc)
    - [What does the OrgBook BC API Offer?](#what-does-the-orgbook-bc-api-offer)
- [Getting Started](#getting-started)
    - [Guide and How-tos](#guide-and-how-tos)
    - [Open API Specification](#open-api-specification)
    - [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Background

### What is OrgBook BC?

OrgBook BC has been developed by the Government of British Columbia as a searchable public directory of open and verifiable data about organizations legally registered in the province. OrgBook BC leverages novel Web 3.0 technology to empower BC and its citizens in the digital economy.

The publicly available search directory can be found [here](https://www.orgbook.gov.bc.ca), however an API has also been made available to allow developers to integrate various OrgBook BC features into their own applications. This repository serves as the central source of information and tools for the API.

### What does the OrgBook BC API offer?

The OrgBook BC API exposes a number of RESTful endpoints that make it simple to integrate open and verifiable data about registered BC organizations into your applications. Some of the features that are available through the API include, but are not limited to:

- Autocomplete-enabled organization name search
- Organization data retrieval, in the form of verifiable credentials (including registration number, business number, entity type, entity status, etc.)
- Credential issuer search
- Credential type search
- Credential verification

## Getting started

A number of resources have been set up in this repository as a guide to using the OrgBook BC API.

### Guide and How-tos

If you are just starting out, this should be your main go-to guide. Please see the [guide](./api.md) for a comprehensive overview of the OrgBook BC API along with examples and implementation instructions for the most common application use cases.

### Open API specification

You may wish to check out the various Open API specifications (specifically [v3](https://orgbook.gov.bc.ca/api/v3/) and [v4](https://orgbook.gov.bc.ca/api/v4/)) if you are interested in a deeper look into a catalogue of all the endpoints available. You are encouraged to use the most up-to-date production version ([v4](https://orgbook.gov.bc.ca/api/v4/)) of the API in your applications to avoid any issues with backward compatibility.

### Demo

To see the OrgBook BC API in action, please check out the official OrgBook BC web [application](https://www.orgbook.gov.bc.ca) featuring the use of various endpoints to create a full-featured verifiable data search tool for registered BC organizations. Developers that are interested in the implementation details of OrgBook BC, are encouraged to view [this](https://github.com/bcgov/orgbook-bc-client) GitHub repository. OrgBook BC was developed with [Vue](https://vuejs.org).

## Contributing

**Pull requests are always welcome!**

Please see the [contributions guide](contributing.md) for this repository.

You may also create an issue if you would like to suggest additional resources to include in this repository.

## License

[Apache License Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt)