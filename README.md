
# talent::digital

TEST

talent::digital provides a suite of tools to enable developers and content creators to create their own learning [content](/docs/GLOSSARY.md#content) and publishing it through the talent::digital [platform](/docs/GLOSSARY.md#platform).

## Overview

[Content](/docs/GLOSSARY.md#content) is deployed in [seasons](/docs/GLOSSARY.md#season), consising of multiple [episodes](/docs/GLOSSARY.md#episode). Each episode is run using a [format](/docs/GLOSSARY.md#format).

![Architecture view](/docs/assets/architecture.drawio.svg)
_Architechture view_

![SCM view](/docs/assets/scm-view.drawio.svg)
_SCM view_

### Developing Formats

A [format](/docs/GLOSSARY.md#format) is, in essence, a web application deployed to [Netlify](https://netlify.com).

The [@talentdigital/kit](/packages/kit/) or [@talentdigital/react](/packages/react/) package facilitates communication with the talent::digital [platform](/docs/GLOSSARY.md#platform). It handles authentication on the [tenant](/docs/GLOSSARY.md#tenant), provides a key-value store (savegame), manages awarding [badges](/docs/GLOSSARY.md#bagde) and writing of [test-item](/docs/GLOSSARY.md#test-item) and [feedback questions](/docs/GLOSSARY.md#feedback-question) [events](/docs/GLOSSARY.md#event) .

Once a new [format](/docs/GLOSSARY.md#format) has been deployed to Netlify, the netlify URL needs to be customized to **https://{format}.netlify.com**, and the application must be served under the path **/app/{format}**. i.e. The [format](/docs/GLOSSARY.md#format) must be accessible under **https://{format}.netlify.app/app/{format}**.

See [@talentdigital/kit](/packages/kit/) or [@talentdigital/react](/packages/react/) for information on how to create new formats.

### Developing Content

A [season](/docs/GLOSSARY.md#season) is, in essence, a [github](https://github.com) repository that contains configuration and [assets](/docs/GLOSSARY.md#asset) for [episodes](/docs/GLOSSARY.md#episode), used by one more more [formats](/docs/GLOSSARY.md#format).

The [season](/docs/GLOSSARY.md#season) is deployed to the talent::digital [platform](/docs/GLOSSARY.md#platform) via the [deploy-season](https://github.com/talent-digital/deploy-season) github action. Once a [season](/docs/GLOSSARY.md#season) has been deployed to the [tenant](/docs/GLOSSARY.md#tenant), [episodes](/docs/GLOSSARY.md#episode) from that [season](/docs/GLOSSARY.md#season) can be launched from the [talent::digital application](/docs/GLOSSARY.md#talentdigital-application).

[Season](/docs/GLOSSARY.md#season) configuration is provided in a `season.yaml` file in the repository's root. The [@talentdigital/season](/packages/season/) package can be installed into the repository, providing a schema file for the `season.yaml`.

[Assets](/docs/GLOSSARY.md#asset) can be placed in an **assets** directory that is deployed to Netlify.

Testing a `season.yaml` file locally:

- Start a [format](/docs/GLOSSARY.md#format) locally (e.g. on `localhost:3000`)
- Serve the `season.yaml` locally (e.g. on `localhost:8080`). You can use the [http-server](https://www.npmjs.com/package/http-server) package, to do so, run `npx http-server --cors` in the folder where `season.yaml` is located.
- Use the `configUrl` url param to point to a local `season.yaml` file, e.g. `http://localhost:3000/?sid=acme-season-one&eid=one&redirectUrl=https://tenant.talentdigital.eu/season/acme-season-one&configUrl=http://localhost:8080`

## Example

In the following example, a developer (ACME), deploys a [season](/docs/GLOSSARY.md#season) (season-one). The season contains three [episodes](/docs/GLOSSARY.md#episode).

| Season     | Episode | Format                   |
| ---------- | ------- | ------------------------ |
| season-one | one     | quiz                     |
| season-one | two     | interactive-conversation |
| season-one | three   | quiz                     |

![Platform Diagram](/docs/assets/talent-digital.platform.drawio.svg)

<!-- ToDo -->

Use the [season template repo]() to get started with creating a new season.

See [@talentdigital/season](/packages/season/) for information on creating seasons and deploying.

# Contributing

This repository contains packages used for creating playable [episodes](/docs/GLOSSARY.md#episode) on the talent::digital [platform](/docs/GLOSSARY.md#platform)

> This repository uses [pnpm](https://pnpm.io/) workspaces and [turborepo](https://turbo.build/repo)

## Packages

### [TalentKit](packages/kit/)

`@talentdigital/kit`

**TalentKit** facilitates communication with the `talent::digital` [platform](/docs/GLOSSARY.md#platform). It is an abstraction over the talent digital api. **TalentKit** uses the generated API client.

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
This will create a "RELEASING" commit that you should merge into the main
remote repository (either directly or through a pull request)
