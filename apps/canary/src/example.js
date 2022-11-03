const TalentKit = {};
const tenantKey = "awo";

// Creates a kit in development mode. Skips authentication.
// All storage and api calls are mocked.
const kit = await TalentKit.create();

// Creates a kit, reads seasonId and episodeId from URL params
// Reads redirectURL from URL Params
// Authenticates the user
kit = await TalentKit.create(tenantKey);

// Creates a kit with sid: 1, eid: 1
kit = await TalentKit.create(tenantKey, { sid: 1, eid: 1 });

// This sends a test event that passes.
await kit.test("test1", "pass"); // typed as "pass" | "fail";
// or
// Would be really good if we coukld generate "test1" as a ts type from the config files... 🤔
await kit.test["test1"].pass(); // Maybe?

// Reads the player profile name
console.log(`Hello ${kit.profile.name}`);

// Sends a test event that fails
await kit.test("test2", "fail"); // typed as "pass" | "fail"
// or
// Would be really good if we coukld generate "test2" as a ts type from the config files... 🤔
await kit.test["test2"].fail(); // Maybe ?

// Stores an arbitrary value, scoped under [sid][eid];
await kit.save("key", "value");

// Loads an arbitrary value, scoped under [sid][eid];
console.log(kit.load("key")); // "value"

// Awards a badge with the id "badgeId"
kit.badges["badgeId"].award();
// or
kit.badge.award("badgeId");

// Awards 1 engagement point.
kit.engagement(1);

// Sends an episode end event and redirects to the dashboard
await kit.end();
