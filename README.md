# talent::digital

## Domain Model

### Overview

The key to understanding talent::digital’s mechanics and its analytics capabilities is the talent::digital domain model. It is depicted on a high-level in the figure below.

The structure is roughly as follows: “Competence targets” are goals derived from a competence development strategy. A competence target brings the competence of a certain team or function in my organization to a certain level.

As example, assume that my sales strategy is to strengthen digital sales. So I could set competence targets for my sales team to become familiar with a modern CRM system and with customer chat tools.
A member of a team or function in my organization is called a “talent”. Being part of a team or function makes that team’s or function’s goals visible to the team member as a “mission”. By actively working with talent::digital content, team members generate events to work towards fulfilling the mission. If they are not successful with parts of the mission, additional content is offered in a personalized manner.

So a sales team member in the above example would see the competence targets for sales, the team’s contribution to the targets, and his or her personal contribution to the targets. The team member gets a recommendation to play an episode about digital CRM. As part of the episode, there are tasks to work with the sales funnel.

While working on the task, events are generated, demonstrating that the sales team member has or has not understood the various sales funnel stages. If the sales team member has understood the stages, these are shown as success towards the competence targets. If the sales team member has not understood the stages, additional learning material is offered and the task can be retried.

![Overview](/docs/assets/overview.drawio.svg)

Using the terminology of data analytics, events and calculations on events are “facts”. Competences, talents and content are “dimensions” with further properties, such as teams, functions, demographic aspects, seasons etc. In the following sections, we delve deeper into these structures, beginning with competences and talents, proceeding to events and finally closing with the concepts of seasons, episodes and content.

### Competences

The competence dimension is depicted below. Competences are structured into competence areas, competences and subcompetences. A competence area is a broader concept, such as sustainability or information technology. A competence in the information technology area may be, for example, IT security. A subcompetence in the IT security area may be device security or password security.
A test item describes a test that the user has to pass to show evidence of having a subcompetence at a particular level. For example, to demonstrate foundational password security knowledge, the user may be required to set sufficiently complex passwords and may be tested to not reuse passwords between different logins.

As later described, competence models are deployed as part of seasons and merged into a single larger competence model that organizations can work with to set competence targets. These targets can be set to any granularity and level of competence, from broad areas (e.g., IT foundations) to very specific topics (e.g., passwords security), from foundational to advanced. This is indicated by the three arrows from “target” to the competences.

A digital certificate can be issued when a user has successfully demonstrated the competences required for a competence target. Digital certificates in talent::digital are currently issued through Accredible.

![Competences](/docs/assets/competences.drawio.svg)

### Talent

The talent dimension is depicted below. Every registered user of an organization is represented as “talent”. Talents can be associated with a team and a department for organizational analysis.  
They can also have an arbitrary number of “tags” to permit other analytical hierarchies. Tags are grouped into tag types. For example, a talent can be associated with a tag “26-35 years” of type “age group”.

**Two tag types have special relevance:**

- The “Function” tag type represents the job function (such as sales, development, …) independent of the organizational structure. Functions can be included into competences targets.
- The “Management responsibility” tag type represents the line management level of the user (no management responsibility, team lead, department manager, …). Management responsibility is included into analysis rules related to the degree of management support of the educational measure.

The talent::digital platform allows developers to create and deploy customized learning material using talent::digital's testing and recommendation engines.

Learning materials are deployed in **seasons**, consising of multiple **episodes**. Each episode is run using a **format**.

![architecture](/docs/assets/architecture.drawio.svg)

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
