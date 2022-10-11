# Deploy scripts

## Local Development

In order to run the script locally you need to set a few environment variables - ask someone in the team for the values. Additionally, you need to set SEASON_FILE_PATH to a path where a season.yaml is located.

An example of such a command:

```
export PW=XXX && export ENVIRONMENT_NAME=devtd2 && export TARGET_DOMAIN=talentdigit.al && export SEASON_FILE_PATH=../apps/canary/ && npm run deploy
```

Where `XXX` in `PW` should be replaced with a proper value.

### Commiting changes

Once you make changes run `npm run build` and commit changes to the `dist` folder.
