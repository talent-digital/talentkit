# Glossary of terms used in this document

Explanation of terms used in this document.

## Asset

Assets are, for example, videos, images, translation files and text scripts deployed with the [season](#season).

## Bagde

[Seasons](#season) can award an arbitrary amount of badges for “special achievements”. (E.g. solving a task particularly well, trying certain alternative solutions).

## Competence

A competence belongs to a [Competence Area](#competence-area) and is a container for [Subcompetences](#subcompetence)

A competence in the information technology area may be, for example, IT security.

## Competence Area

A competences area is a container for [Subcompetences](#subcompetence)

A competence area is a broader concept, such as sustainability or information technology.

## Competence Model

Competences are structured into [competence areas](#competence-area), [competences](#competence) and [subcompetences](#subcompetence).

![Competences](/docs/assets/competences.drawio.svg)

## Content

Content is the collective term used for learning material administared to the user. The learning content dimension is depicted in the image below.

![Content](/docs/assets/content.drawio.svg)

## Department

A department is an organisational unit for [talent](#talent) A collection of [teams](#team)

## Episode

A [season](#season) consists of a set of episodes. Episodes are shorter learning units in a particular format (e.g., simulation, quiz, dialog; corresponds to an app) with a particular configuration (e.g., the questions in the quiz). Episodes contain [test items](#test-item) that can be passed or failed when a task is correctly or incorrectly performed.

## Event

While using talent::digital, events are recorded. Events are associated with the [talent](#talent) who created the event and with a timestamp.

![Events](/docs/assets/events.drawio.svg)

There are several types of events:

- Test results indicate whether the user passed or failed a [test item](#test-item) of a particular competence.
- Feedback results record the results of any attitude- or [feedback questions](#feedback-question) in the game.

## Feedback Question

Feedback items are used to determine the attitude of the user towards certain topics.

## Format

Each [episode](#episode) can be in a number of different formats from a format library. Formats can range from extremely simple “yes/no” question sessions towards more advanced multiplayer simulations such as collaborating live to create a document in a simulated Office tool. A format is a stand-alone web application that uses the [@talentdigital/kit](/packages/kit/) package to communicate with the [platform](#platform).

## Platform

talent::digital's APIs, Application Launcher, Analytics Engines, etc.

## Season

talent::digital learning content is deployed in the form of a “season”, containing multiple [episodes](#episode). A season trains a particular [set of competences](#competence-model).

## Signal

Signal definitions are advanced analytics rules that can be deployed with the [content](#content), for example, calculating the risk of a phishing attack in a [season](#season) about IT security.

## Subcompetence

Belongs to a [Competence](#competence) and is a container for [test items](#test-item).

A subcompetence in the IT security area may be device security or password security.

## talent::digital application

The talent digital application is entry point for all users. It allows [talent](#talent) to launch [episodes](#episode) and see results.

## Talent

Every registered user of an organization is represented as “talent”. Talents can be associated with a [team](#team) and a [department](#department) for organizational analysis.

## Test Item

A test item describes a test that the user has to pass to show evidence of having a [subcompetence](#subcompetence) at a particular level. For example, to demonstrate foundational password security knowledge, the user may be required to set sufficiently complex passwords and may be tested to not reuse passwords between different logins.

## Training

Training is recommended to the [talent](#talent) if there is a more systematic competence gap related to the [competences](#competence-model) in the [season](#season) (i.e., many [test items](#test-item) are failed on first try).

## Team

An organisational unit for [talent](#talent). Belongs to a [Department](#department)

## Tenant

talent::digital has a multi-tenant architechture. Each tanant runs on a separate Kubernetes namespace, and has its own database instance. A tenant is ideentified by a unique ID, known as the tanant ID.
