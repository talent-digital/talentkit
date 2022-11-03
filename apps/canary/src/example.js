const TdKit = {};
const config = {
  realm: "talentdigital-devtd2",
  url: "https://devtd2.talentdigit.al/auth",
  clientId: "td-profile2",
};

// Creates a kit, reads seasonId and episodeId from URL params
// Reads redirectURL from URL Params
// Authenticates the user
const kit = await TdKit.create(config);

// Creates a kit with sid: 1, eid: 1
kit = await TdKit.create(config, { sid: 1, eid: 1 });

// This sends a test event that passes.
await kit.test("test1", true);

// Reads the player profile name
console.log(`Hello ${kit.profile.name}`);

// Sends a test event that fails
await kit.test("test2", false);

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
