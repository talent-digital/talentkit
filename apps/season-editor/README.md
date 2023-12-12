# Season Editor

A tool used for editing season.yaml files.

## Known quirks

Removing a competence should remove it's children. The easiest way to achieve this is to set `shouldUnregister: true` in react hook forms, this solution works. The downside of this approach is that is can sometimes be overaggresive and can clear some values in the background. Currently all known issues have been solved but be cautious when changing the competence tree.
