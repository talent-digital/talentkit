# Proposals for migration to new metadata model

This is a proposal for a metadata model. We may need to introduce some bridge solutions. Nevertheless I find it useful to discuss a final outcome and then steps to reach it.

A sample "season.yaml" can be found in the root folder. We should use an extended "hello world" to demonstrate the model instead of an actual customer configuration.

## Internationalization

While working on metadata internationalization in the backend, we can already use the structure.

Backend: If a data type is not internationalized, simply only one language is inserted. (The one that is present in the definition, or "de" if there are multiple.)

Frontend: If a text has a translation in the locale files, use the translation from there.

## ID handling

In future, we can generate a space for unique IDs using Github repository handles. Examples: talentdigital/collaboration (for Season 2), jci/solutioneer (for OpenBlue solutioneer).

All further IDs are qualified using the handle. E.g. episodes can be jci/solutioneer/episodes/1, jci/solutioneer/testitem/bla, jci/solutioneer/badge/...

Currently, season and episode IDs are expected to be numerical and appear in various forms. Some queries depend on a particular form, e.g., to find test items. This requires a fix.

## SeasonDefinition properties

- completed: This property determines if the season end animation should be played when the last defined episode is reached. Proposal: Drop, since we can now define much more easily dummy episodes.
- index: This property defines the order in which the seasons are shown in the season overview. Proposal: Drop and order by mission targets.
- certificates: These are currently attached to subcompetences. Proposal: Generate certificates dynamically for missions. This also avoids the need for two ways of handling recommendations (for reaching missions and for reaching certificates, as currently).
- badges: Moved into episodes. This avoids the need for back references and episode developers can anyway only generate badges within episodes. Platform badges are "declared elsewhere".
- topics: Topics are currently competence areas shown in the season. Proposal: Drop and generate from the competence model of the season.

## EpisodeDefinition properties

- ID is kept here to support moving around episodes that have existing data (e.g., feedback, savegames).
- testsId: Proposal: Drop and use ID.
- index: Proposal: Order like in the array ... why was that different?

Note: "available" and "state" are not part of the episode metadata.

## Competences

The tree including test items is entirely represented in the season metadata to avoid the need for reference properties that can be mistyped. I added feedback items also here, because it might be a good criterion to report on what area feedback was actually provided for. 

## Open questions

Here are open questions found while defining the metadata model:

* Test items currently have an implicit back reference to the episode they were placed in. The problem here is that this is redundant with the code that actually runs the tests. If you move a test elsewhere, you need to move the metadata consistently along. Also you need to introduce references in the configuration file, which might be dangling. Can we instead generate the tab after the episode based on what was actually passed and failed when playing the episode? (E.g. from save game or stored with events?)
* Can we determine the URL from which the build is served programmatically or do we need to configure it somewhere?
* Should we qualify competences and subcompetences with their parent ID to make them unique instead of requiring them to be globally unique? You anyway can't have a competence without subcompetence.
* Do we have a convention for enums in Typescript? (All caps, camel case, ...)
* Wouldn't language codes like "de" or "en" come from "elsewhere"? Is there a standard "LocalizedString" type somewhere?
* Where should the "season.yaml" file be put finally? What is the reference structure for a season repository? Proposal: Put it in the root folder of a repository.

## Technical notes

To build the SeasonDefinitionTypes.json, use:

```
npx ts-json-schema-generator -p SeasonDefinition.ts > SeasonDefinitionTypes.json
```

To use VS Code IntelliSense for the season.yaml file including documentation, edit the settings.json file and search for the "yaml.schemas" property. Add the line below. 

```
  "yaml.schemas": {
    "./packages/season/SeasonDefinition.json": ["/season.yaml"]
  },
```

Note: Once we have settled the schema, we can make a PR to https://github.com/schemastore/schemastore/ and get this automatically for VS Code.

I tried introducing a type like below to make the maps more legible, but it's not digested by the ts-json-schema-generator.

```
export type IDMap<Type> = { [id in string]: Type };
```

I added "undefined" to LocalizedString. If I would not make it undefined, we would need to provide all languages keys whenever we develop an episode, even if the customer doesn't need french/spanish/...

