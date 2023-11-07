# TalentKit snippet integration

This package provides a single file snippet to integrate TalentKit. It works by finding elements with specific css classes and attaching the TalentKit functionality to them.

## Available classes

- `.td-test-pass` - On click, sends a test pass event with the specified id, e.g. `td-test-pass td-test-id-secure-password`
- `.td-test-fail` - On click, sends a test fail event with the specified id, e.g. `td-test-fail td-test-id-secure-password`
- `.td-test-id-${id}` - Used in together with `td-test-pass` or `td-test-fail` to specifc the id of the test

## Development

After making changes, build the package throught `pnpm build` and test it through `apps/canary-snippet-integration`.