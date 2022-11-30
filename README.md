# talent::digital

This repository contains packages used for creating playable episodes on the talent::digital platform

> This repository uses [pnpm](https://pnpm.io/) workspaces and [turborepo](https://turbo.build/repo)  

## [TalentKit](packages/kit/)

`@talentdigital/kit`

__TalentKit__ facilitates communication with the `talent::digital` platform. It is an abstraction over the talent digital api. __TalentKit__ uses the generated API client.

## [API Client](packages/api-client/)

`@talentdigital/api-client`

The __API Client__ is automatically generated from the OpenApi specification for the talent::digital API. The api generator is located [here](https://github.com/talent-digital/talentdigital/tree/master/api-client-generator).

## [React](packages/react/)

`@talentdigital/react`

The __React__ library is a wrapper around the __TalentKit__ package that allows for easier use of __TalentKit__ in React.
## [Canary](apps/canary/)

The Canary app can be used as a testing environment when developing the __TalentKit__

## [Season](packages/season/)

`@talentdigital/season`

The Season package contains the TypeScript type definition and accompanying JSON schema for creating a `season` deployment. The JSON schema can be used to validate the `season.yml` files during development.