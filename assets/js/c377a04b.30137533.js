"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[361],{8321:(e,i,o)=>{o.r(i),o.d(i,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var n=o(4848),t=o(8453);const r={slug:"/"},s="OrgBook BC API",a={id:"index",title:"OrgBook BC API",description:"Lifecycle:Stable",source:"@site/docs/index.md",sourceDirName:".",slug:"/",permalink:"/orgbook-bc-api-docs/",draft:!1,unlisted:!1,editUrl:"https://github.com/bcgov/orgbook-bc-api-docs/tree/main/docs/index.md",tags:[],version:"current",frontMatter:{slug:"/"},sidebar:"tutorialSidebar",next:{title:"Guide",permalink:"/orgbook-bc-api-docs/api"}},c={},l=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Background",id:"background",level:2},{value:"What is OrgBook BC?",id:"what-is-orgbook-bc",level:3},{value:"What does the OrgBook BC API offer?",id:"what-does-the-orgbook-bc-api-offer",level:3},{value:"Getting started",id:"getting-started",level:2},{value:"Guide and How-tos",id:"guide-and-how-tos",level:3},{value:"Open API specification",id:"open-api-specification",level:3},{value:"Demo",id:"demo",level:3},{value:"Contributing",id:"contributing",level:2},{value:"License",id:"license",level:2}];function d(e){const i={a:"a",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.header,{children:(0,n.jsx)(i.h1,{id:"orgbook-bc-api",children:"OrgBook BC API"})}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.a,{href:"https://github.com/bcgov/orgbook-bc-api-docs",children:(0,n.jsx)(i.img,{src:"https://img.shields.io/badge/Lifecycle-Stable-97ca00",alt:"Lifecycle"})})}),"\n",(0,n.jsx)(i.p,{children:"Various developer tools and documentation for using the OrgBook BC API as part of the Verifiable Organizations Network."}),"\n",(0,n.jsx)(i.h2,{id:"table-of-contents",children:"Table of contents"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsxs)(i.li,{children:[(0,n.jsx)(i.a,{href:"#background",children:"Background"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"#what-is-orgbook-bc",children:"What is OrgBook"})}),"\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"#what-does-the-orgbook-bc-api-offer",children:"What does the OrgBook BC API Offer?"})}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(i.li,{children:[(0,n.jsx)(i.a,{href:"#getting-started",children:"Getting Started"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"#guide-and-how-tos",children:"Guide and How-tos"})}),"\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"#open-api-specification",children:"Open API Specification"})}),"\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"#demo",children:"Demo"})}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"#contributing",children:"Contributing"})}),"\n",(0,n.jsx)(i.li,{children:(0,n.jsx)(i.a,{href:"#license",children:"License"})}),"\n"]}),"\n",(0,n.jsx)(i.h2,{id:"background",children:"Background"}),"\n",(0,n.jsx)(i.h3,{id:"what-is-orgbook-bc",children:"What is OrgBook BC?"}),"\n",(0,n.jsx)(i.p,{children:"OrgBook BC has been developed by the Government of British Columbia as a searchable public directory of open and verifiable data about organizations legally registered in the province. OrgBook BC leverages novel Web 3.0 technology to empower BC and its citizens in the digital economy."}),"\n",(0,n.jsxs)(i.p,{children:["The publicly available search directory can be found ",(0,n.jsx)(i.a,{href:"https://www.orgbook.gov.bc.ca",children:"here"}),", however an API has also been made available to allow developers to integrate various OrgBook BC features into their own applications. This repository serves as the central source of information and tools for the API."]}),"\n",(0,n.jsx)(i.h3,{id:"what-does-the-orgbook-bc-api-offer",children:"What does the OrgBook BC API offer?"}),"\n",(0,n.jsx)(i.p,{children:"The OrgBook BC API exposes a number of RESTful endpoints that make it simple to integrate open and verifiable data about registered BC organizations into your applications. Some of the features that are available through the API include, but are not limited to:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Autocomplete-enabled organization name search"}),"\n",(0,n.jsx)(i.li,{children:"Organization data retrieval, in the form of verifiable credentials (including registration number, business number, entity type, entity status, etc.)"}),"\n",(0,n.jsx)(i.li,{children:"Credential issuer search"}),"\n",(0,n.jsx)(i.li,{children:"Credential type search"}),"\n",(0,n.jsx)(i.li,{children:"Credential verification"}),"\n"]}),"\n",(0,n.jsx)(i.h2,{id:"getting-started",children:"Getting started"}),"\n",(0,n.jsx)(i.p,{children:"A number of resources have been set up in this repository as a guide to using the OrgBook BC API."}),"\n",(0,n.jsx)(i.h3,{id:"guide-and-how-tos",children:"Guide and How-tos"}),"\n",(0,n.jsxs)(i.p,{children:["If you are just starting out, this should be your main go-to guide. Please see the ",(0,n.jsx)(i.a,{href:"/orgbook-bc-api-docs/api",children:"guide"})," for a comprehensive overview of the OrgBook BC API along with examples and implementation instructions for the most common application use cases."]}),"\n",(0,n.jsx)(i.h3,{id:"open-api-specification",children:"Open API specification"}),"\n",(0,n.jsxs)(i.p,{children:["You may wish to check out the various Open API specifications (specifically ",(0,n.jsx)(i.a,{href:"https://orgbook.gov.bc.ca/api/v3/",children:"v3"})," and ",(0,n.jsx)(i.a,{href:"https://orgbook.gov.bc.ca/api/v4/",children:"v4"}),") if you are interested in a deeper look into a catalogue of all the endpoints available. You are encouraged to use the most up-to-date production version (",(0,n.jsx)(i.a,{href:"https://orgbook.gov.bc.ca/api/v4/",children:"v4"}),") of the API in your applications to avoid any issues with backward compatibility."]}),"\n",(0,n.jsx)(i.h3,{id:"demo",children:"Demo"}),"\n",(0,n.jsxs)(i.p,{children:["To see the OrgBook BC API in action, please check out the official OrgBook BC web ",(0,n.jsx)(i.a,{href:"https://www.orgbook.gov.bc.ca",children:"application"})," featuring the use of various endpoints to create a full-featured verifiable data search tool for registered BC organizations. Developers that are interested in the implementation details of OrgBook BC, are encouraged to view ",(0,n.jsx)(i.a,{href:"https://github.com/bcgov/orgbook-bc-client",children:"this"})," GitHub repository. OrgBook BC was developed with ",(0,n.jsx)(i.a,{href:"https://vuejs.org",children:"Vue"}),"."]}),"\n",(0,n.jsx)(i.h2,{id:"contributing",children:"Contributing"}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.strong,{children:"Pull requests are always welcome!"})}),"\n",(0,n.jsxs)(i.p,{children:["Please see the ",(0,n.jsx)(i.a,{href:"/orgbook-bc-api-docs/contributing",children:"contributions guide"})," for this repository."]}),"\n",(0,n.jsx)(i.p,{children:"You may also create an issue if you would like to suggest additional resources to include in this repository."}),"\n",(0,n.jsx)(i.h2,{id:"license",children:"License"}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.a,{href:"https://www.apache.org/licenses/LICENSE-2.0.txt",children:"Apache License Version 2.0"})})]})}function h(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},8453:(e,i,o)=>{o.d(i,{R:()=>s,x:()=>a});var n=o(6540);const t={},r=n.createContext(t);function s(e){const i=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function a(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),n.createElement(r.Provider,{value:i},e.children)}}}]);