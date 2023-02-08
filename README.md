# talent::digital

The talent::digital platform allows developers to create and deploy customized learning material using talent::digital's testing and recommendation engines.

Learning materials are deployed in **seasons**, consising of multiple **episodes**. Each episode is run using a **format**.

_For example:_

| Season     | Episode | Format                   |
| ---------- | ------- | ------------------------ |
| season-one | one     | quiz                     |
| season-one | two     | interactive-conversation |
| season-one | three   | quiz                     |
| season-two | one     | simulation               |

![Platform Diagram](/docs/assets/talent-digital.platform.drawio.svg)
_[Edit image](https://app.diagrams.net/)_

talent::digital has a multi-tennant architecture. When a **format** is run, a **tennant id** must be provided. **Tennant ids** can be obtained from [talent::digital](mailto:info@talentdigital.eu).

## Formats

A format is a web application running on [Netlify](https://netlify.com).The [talentdigital/kit](@talentdigital/kit) package facilitates communication with the talent::digital platform. It handles authentication on the tennant, provides a key-value store (savegame), manages awarding badges and writing of test events and feedback questions.

Once a new format has been deployed to Netlify, the netlify URL needs to be customized to **https://{format}.netlify.com**, and the application must be served under the path **/app/{format}**. i.e. The format must be accessible under **https://{format}.netlify.app/app/{format}**.

See [@talentdigital/kit](/packages/kit/) or [@talentdigital/react](/packages/react/) for information on how to create new formats.

## Seasons and Episodes

A **season** is is a [github](https://github.com) repository that contains configuration and assets for **episodes**, used by one more more **formats**.

The **season** is deployed to the talent::digital platform via the [deploy-season](https://github.com/talent-digital/deploy-season) github action. Once a season has been deployed to the **tennant**, episodes from that season can be launched from the talent::digital **dashboard** application.

Season configuration is provided in a `season.yaml` file in the repository's root. The [@talentdigital/season](/packages/season/) package can be installed into the repository, providing a schema file for the `season.yaml`.

Assets can be placed in an **assets** directory that is deployed to Netlify.

<!-- ToDo -->

Use the [season template repo]() to get started with creating a new season.

See [@talentdigital/season](/packages/season/) for information on creating seasons and deploying.

# Contributing

This repository contains packages used for creating playable episodes on the talent::digital platform

> This repository uses [pnpm](https://pnpm.io/) workspaces and [turborepo](https://turbo.build/repo)

## Packages

### [TalentKit](packages/kit/)

`@talentdigital/kit`

**TalentKit** facilitates communication with the `talent::digital` platform. It is an abstraction over the talent digital api. **TalentKit** uses the generated API client.

### [API Client](packages/api-client/)

`@talentdigital/api-client`

The **API Client** is automatically generated from the OpenApi specification for the talent::digital API. The api generator is located [here](https://github.com/talent-digital/talentdigital/tree/master/api-client-generator).

### [React](packages/react/)

`@talentdigital/react`

The **React** library is a wrapper around the **TalentKit** package that allows for easier use of **TalentKit** in React.

### [Canary](apps/canary/)

The Canary app can be used as a testing environment when developing the **TalentKit**

### [Season](packages/season/)

`@talentdigital/season`

The Season package contains the TypeScript type definition and accompanying JSON schema for creating a `season` deployment. The JSON schema can be used to validate the `season.yml` files during development.

## Publishing changes

This repo makes use of [`@changesets/cli`](https://www.npmjs.com/package/@changesets/cli) to handle package versioning and publication.

When adding changes to a package, follow these steps on your **feature branch**:

1. Run this command

```
npx changeset
```

2. Follow the prompts to specify version bumps and change summaries
3. Commit the generated file in the `.changeset` folder.

Once the feature has been merged to main, run the command:

```
pnpm publish-packages
```

This will add the necessary version bumps and publish the package to npm.
