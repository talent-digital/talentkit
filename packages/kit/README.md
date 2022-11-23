# TalentKit

> A batteries-included SDK for developing episode formats for the talent::digital platform

## Intstallation

Install the `@talentdigital/kit` package and it's peer depencency `keycloak-js`.

### npm

```sh
npm install @talentdigital/kit keycloak-js
```

### yarn

```sh
yarn add @talentdigital/kit keycloak-js
```

### pnpm

```sh
pnpm add @talentdigital/kit keycloak-js
```

## Usage

The TalentKit can be run in _development_ or _production_ mode.

### Modes

#### Development Mode

The `kit` can be run in _development mode_ by providing the season definition as a parameter to the create method.

When run on development mode, nothing is written to the talent::digital API.

```typescript
// season is imported from season.yml
import TalentKit from "@talentdigital/kit";

const kit = await TalentKit.create({
  seasonDefinition: season,
});
```

#### Production Mode

The `kit` can be run in _production mode_ by omiting the season definition and providing the `tenant` id. The tenant id can be obtained from talent::digital.

When run on _production mode_ data a connection is made to the talent::digital API.

```typescript
import TalentKit from "@talentdigital/kit";

const kit = await TalentKit.create({
  tenant: "tenantId",
});
```

### Loading an Episode

The `season` and `episode` ids are provided as _URL Parameters_ in the form `?sid=X&eid=Y` where `sid` is the season identifer and `eid` is the episode identifyer (specified in the `season.yml`).

For testing purposes, the `season` and `episode` ids can be provided as a parameter to the `TalentKit.create` method.

```typescript
import TalentKit from "@talentdigital/kit";

const kit = await TalentKit.create({
  tenant: "tenantId",
  id: {
    season: "seasonID",
    episode: "epsisodeId",
  }
});
```

## Features

### Test Events

Tests for the given episode are instantiated when the `kit` is created. Tests have the following methods:

#### Passing a test
```typescript
await kit.tests["testId"].pass();
```

#### Failing a test
```typescript
await kit.tests["testId"].fail();
```

### Badges

Badges available in the given episode are instantiated when the `kit` is created. 

#### Awarding a badge

```typescript
await kit.badges["badgeId"].award();
```

#### Check if a badge has been awarded.

```typescript
if (kit.badges["badgeId"].awarded) {
    // do something
}
```

### Savegame

Each episode has its own savegame storage available.

#### Saving

To write an object to the savegame storage

```typescript
await kit.savegame.save(obj);
```

#### Loading

To load an object from the episode savegame.

```typescript
const obj = kit.savegame.load();
```

### Feedback questions

__TBD__