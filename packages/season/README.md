# Season

A season is a collection of runnable **Episodes** on the talent::digital platform.

Technically, a **season** is a [github](https://github.com) repository that contains configuration and assets for **episodes**, used by one more more **formats**.

## Configuration

Season configuration is specified as a `yaml` file called `season.yaml` in the root of the season github repository.

**It has the following structure**

- title
  - de (string)
  - en (string)
- info
  - de (string)
  - en (string)
- assetsURL (string)
- competenceAreas
  - (string)
    - competences
      - (string)
        - subCompetences
          - (string)
            - name
              - de (string)
              - en (string)
            - testItems
              - (string)
                - level (FOUNDATION | INTERMEDIATE | ADVANCED HIGHLY_SPECIALISED)
                - episode
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
            - feedbackQuestions
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
- episodes:
  - (string)
    - title:
      - de (string)
      - en (string)
    - description:
      - de (string)
      - en (string)
    - maturity (PENDING | ALPHA | BETA | PUBLIC)
    - imageUrl (string)
    - format: (string)
    - formatConfiguration (string)
    - badges:
      - (string)
        - name
          - de (string)
          - en (string)
        - image (string)
- seasonEndMessage
  - de (string)
  - en (string)

### Competences

talent::digital's competence model consists of 3 three levels of hierarchy: Competence Area, Competence & Sub Competence.

### Test Items

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
