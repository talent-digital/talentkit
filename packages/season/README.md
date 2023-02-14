# Season

A [season](/docs/GLOSSARY.md#season) is a collection of runnable [episodes](/docs/GLOSSARY.md#episode) on the talent::digital [platform](/docs/GLOSSARY.md#platform).

Technically, a **season** is a [github](https://github.com) repository that contains configuration and [assets](/docs/GLOSSARY.md#asset) for **episodes**, used by one more more [formats](/docs/GLOSSARY.md#format).

## Configuration

Season configuration is specified as a `yaml` file called `season.yaml` in the root of the season github repository.

**Season.yaml Structure**

- title
  - de (string)
  - en (string)
- info
  - de (string)
  - en (string)
- assetsURL (string)
- [competenceAreas](/docs/GLOSSARY.md#competence-area)
  - (string)
    - [competences](/docs/GLOSSARY.md#competence)
      - (string)
        - [subCompetences](/docs/GLOSSARY.md#subcompetence)
          - (string)
            - name
              - de (string)
              - en (string)
            - [testItems](/docs/GLOSSARY.md#test-item)
              - (string)
                - level (FOUNDATION | INTERMEDIATE | ADVANCED HIGHLY_SPECIALISED)
                - [episode](/docs/GLOSSARY.md#episode)
                - documentation
                  - de (string)
                  - en (string)
                - search
                  - de
                    - generic
                      - (string)
                  - en
                    - generic
                      - (string)
            - [feedbackQuestions](/docs/GLOSSARY.md#feedback-question)
              - (string)
                - episode (string)
                - question
                  - de (string)
                  - en (string)
                - answers
                  - (string)
                    - de (string)
                    - en (string)
                  - (string)
                    - de (string)
                    - en (string)
                  - (string)
                    - de (string)
                    - en (string)
- [episodes](/docs/GLOSSARY.md#episode):
  - (string)
    - title:
      - de (string)
      - en (string)
    - description:
      - de (string)
      - en (string)
    - maturity (PENDING | ALPHA | BETA | PUBLIC)
    - imageUrl (string)
    - [format](/docs/GLOSSARY.md#format): (string)
    - formatConfiguration (string)
    - [badges](/docs/GLOSSARY.md#bagde):
      - (string)
        - name
          - de (string)
          - en (string)
        - image (string)
- seasonEndMessage
  - de (string)
  - en (string)

## Getting Started

Here are the steps required to release a new [season](/docs/GLOSSARY.md#season).

<!-- ToDo: Create season-template repository -->

1. Clone the [season-template](https://github.com/talent-digital/season-template) repository.
2. Customize the [Netlify](https://netlify.com) app URL for the season.
3. Complete the `season.yaml` file according to the configuration above. (see example below).
4. Add any [assets](/docs/GLOSSARY.md#asset) into the `assets` directory.
5. Add the `EPISODES_PROVISIONER_CLIENT_PASSWORD` (obtained from talent::digital) as an _Actions Secret_ Into the github repository. ([See here](https://docs.github.com/en/actions/security-guides/encrypted-secrets))
<!-- ToDo use TENANT_ID in the deploy.yml in template repo-->
6. Add the `TENANT_ID` as a repository variable. ([See here](https://docs.github.com/en/actions/learn-github-actions/variables)).
7. Merge your changes to the main branch

Once changes are merged to the main branch, the deploy-season github action will add deploy the contents of `season.yaml` to the [platform](/docs/GLOSSARY.md#platform) and the [assets](/docs/GLOSSARY.md#asset) will be deployed to [Netlify](https://netlify.com)

YAML Example:

```yaml
title:
  de: Season Title in German
  en: Season Title in German
info:
  de: Season Description in German
  en: Season Description in English
assetsURL: the netlify url of for the season https://{season id}.netlify.app
competenceAreas:
  "Competence Area 1": # Competence Area Id (string)
    competences:
      "Competence 1": # Competence Id (string)
        subCompetences:
          "Sub Competence 1": # Sub Competence Id (string)
            name:
              de: Name of Subcompetence in German
              en: Name of Subcompetence in English
            testItems: # Tests that belong to this sub competence
              "Test Item 1" # Test Id (string)
                level: FOUNDATION # Level of the test FOUNDATION, INTERMEDIATE, ADVANCED, HIGHLY_SPECIALISED
                episode: "Episode 1" # Id of the episode this test item is used in
                documentation:
                  de: Test description # German description of the skill this test measures
                  en: Test description # English description of the skill this test measures
                search:
                  de:
                    generic:
                      - search term in German # German searches that are carried out by the scraper
                  en:
                    generic:
                      - search term in English # English searches that are carried out by the
            feedbackQuestions: # Feedback that is collected for this sub competence
              "Feedback Question 1": # Feedback Question Id (string)
                episode: "Episode 1" # Id of the episode this feedback question is used in
                question: # The question to ask
                  de: German Question
                  en: English Question
                answers: # The answers, ordered from assumed good to bad.
                  "0":
                    de: Option in German
                    en: Option in English
                  "1":
                    de: Option in German
                    en: Option in English
                  "2":
                    de: Option in German
                    en: Option in English

episodes:
  "Episode 1": # The episode Id
    title: # The episode title
      de: Title in German
      en: Title in English
    description:
      de: Episode description in German
      en: Episode description in English
    maturity: PUBLIC #
    imageUrl: filename # The filename of the images, base is the assetsUrl
    format: formatId # The id of the format this episode uses
    formatConfiguration: filename # The filename of the configuration for this format, supports json, yaml, toml & markdown
    badges: # A list of badges
      "Badge 1":
        name:
          de: Badge name in German
          en: Badge name in English
        image: filename # The filename of the image used for this badge, base is the assetsUrl

seasonEndMessage: # The message displayed when the last episode in this season is played
  de: Message in German
  en: Message in English
```
