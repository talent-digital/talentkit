# Season

A season is a collection of runnable **Episodes** on the talent::digital platform.

Tecnically, a **season** is a [github](https://github.com) repository that contains configuration and assets for **episodes**, used by one more more **formats**.

## Configuration

Season configuration is specified as a `yaml` file called `season.yaml` in the root of the season github repository.

- title:
  - de: Season Title in German
  - en: Season Title in German
- info:
  - de: Season Description in German
  - en: Season Description in English
- assetsURL: the netlify url of for the season https://{season id}.netlify.app
- competenceAreas:
  - "Competence Area 1": # Competence Area Id (string)
    - competences:
      - "Competence 1": # Competence Id (string)
        - subCompetences:
          - "Sub Competence 1": # Sub Competence Id (string)
            - name:
              - de: Name of Subcompetence in German
              - en: Name of Subcompetence in English
            - testItems: # Tests that belong to this sub competence
              - "Test Item 1" # Test Id (string)
                - level: FOUNDATION # Level of the test FOUNDATION, INTERMEDIATE, ADVANCED, HIGHLY_SPECIALISED
                - episode: "Episode 1" # Id of the episode this test item is used in
                - documentation:
                  - de: Test description # German description of the skill this test measures
                  - en: Test description # English description of the skill this test measures
                - search:
                  - de:
                    - generic:
                      - search term in German # German searches that are carried out by the scraper
                  - en:
                    - generic:
                      - search term in English # English searches that are carried out by the
            - feedbackQuestions: # Feedback that is collected for this sub competence
              - "Feedback Question 1": # Feedback Question Id (string)
                - episode: "Episode 1" # Id of the episode this feedback question is used in
                - question: # The question to ask
                  - de: German Question
                  - en: English Question
                - answers: # The answers, ordered from assumed good to bad.
                  - "0":
                    - de: Option in German
                    - en: Option in English
                  - "1":
                    - de: Option in German
                    - en: Option in English
                  - "2":
                    - de: Option in German
                    - en: Option in English
- episodes:
  - "01":
    - title:
      - de: SAAT & GUT Co. KGaA, Frau Hennings
      - en: SAAT & GUT Co. KGaA, Mrs. Hennings
    - description:
      - de: Du wirst überraschend zu einem Termin mit dem Thema "Wartungsvertrag Brandmeldetechnik" eingeladen, dabei ist der Vetrag längst unter Dach und Fach. Was ist das los?
      - en: You are unexpectedly invited to an appointment with the topic "maintenance contract fire alarm technology", although the contract has long been signed and sealed. What's going on?
    - maturity: public
    - imageUrl: e01preview.svg
    - format: /conversation
    - formatConfiguration: dialog01.json
    - badges:
      - "caffeine":
        - name:
          - de: Perfekter Koffein-Level!
          - en: Perfect caffeine level!
            image: coffee-hand.svg
  - "02":
    - title:
      - de: SAAT & GUT Co. KGaA, Dr. Alexander Varus
      - en: SAAT & GUT Co. KGaA, Dr. Alexander Varus
    - description:
      - de: Dir ist es gelungen, die Situation zu drehen und das Interesse des Kunden zu wecken. Kannst du SAAT & GUT mit digitalen Mitteln aus der Klemme helfen?
      - en: You have managed to turn the situation around and get the customer's interest. Can you help SAAT & GUT digitally out of a tight spot?
    - maturity: public
    - imageUrl: e02preview.svg
    - format: /conversation
    - formatConfiguration: dialog02.json
- seasonEndMessage:
  - de: Du hast es geschafft! Jetzt kannst du dich mit Fug und Recht "OpenBlue Solutioneer" nennen.
  - en: You have done it! Now you can really call yourself an "OpenBlue Solutioneer".

YAML Schema:

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
  "01":
    title:
      de: SAAT & GUT Co. KGaA, Frau Hennings
      en: SAAT & GUT Co. KGaA, Mrs. Hennings
    description:
      de: Du wirst überraschend zu einem Termin mit dem Thema "Wartungsvertrag Brandmeldetechnik" eingeladen, dabei ist der Vetrag längst unter Dach und Fach. Was ist das los?
      en: You are unexpectedly invited to an appointment with the topic "maintenance contract fire alarm technology", although the contract has long been signed and sealed. What's going on?
    maturity: public
    imageUrl: e01preview.svg
    format: /conversation
    formatConfiguration: dialog01.json
    badges:
      "caffeine":
        name:
          de: Perfekter Koffein-Level!
          en: Perfect caffeine level!
        image: coffee-hand.svg

seasonEndMessage:
  de: Du hast es geschafft! Jetzt kannst du dich mit Fug und Recht "OpenBlue Solutioneer" nennen.
  en: You have done it! Now you can really call yourself an "OpenBlue Solutioneer".
```
