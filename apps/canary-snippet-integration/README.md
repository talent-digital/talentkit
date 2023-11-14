# Canary snippet integration

Use this as a testing grounds for the kit-snippet-integration package.

## Starting

- Run `pnpm dev` (this also copies the snippet from node_modules to libs folder for cypress to run properly)
- Go to e.g. `http://localhost:8080/?sid=talent-digital-canary-season&eid=1&redirectUrl=https://devtd2.talentdigit.al`

## Debugging

The script has several debug logs, to see them switch to "verbose" in chrome devtools.

## Cypress setup

To run cypress locally, create a `cypress.env.json` out of `cypress.env.template.json` and fill in the variables. Cypress locally runs against your local dev enviroment so be sure to run `pnpm dev` before runing `pnpm e2e:local` or `pnpm e2e:open`.
