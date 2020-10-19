# react-timesheet

## Summary
A client has determined that they need to be able to track time for their employees. The employees
should be able to access the application and begin adding their activity and submit. A person shouldn’t
be able to capture more than 8 hours a day. Anything more than 8 hours is flagged as overtime and
requires manager approval. An implementation of the Approval Workflow is not required.
When a user arrives on the application, the previous entries for the day should be shown.
A greeting to the current logged in user should be shown with their Display Name in the message

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.11-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Existing list named "Timesheet"

Column Internal Name|Type
-------|---
Description|Multiple lines of text
Category|Choice
Date|Date
Hours|Number
Status|Choice

## Solution

Solution|Author(s)
--------|---------
folder name | Kevin Tshiowa



## Version history

Version|Date|Comments
-------|----|--------
1.0|October 19, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

or

- Clone this repository
- in the command line run:
  - npm install
  - gulp build
  - gulp bundle --ship
  - gulp package-solution --ship
- Add and Deploy Package to AppCatalog

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- React
- PNP

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
