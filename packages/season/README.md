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

To create a new season, see [talent-digital/season-template](https://github.com/talent-digital/season-template).
