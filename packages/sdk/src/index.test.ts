import TdSdk from ".";

import { beforeAll, describe, expect, it } from "vitest";
import { Episode } from "./episode";

const realm = "talentdigital-devtd2";
const url = "https://devtd2.talentdigit.al/auth";
const clientId = "td-profile2";

describe("Sdk Base Tests", async () => {
  let sdk: TdSdk;
  beforeAll(async () => {
    sdk = await await TdSdk.create(
      {
        clientId,
        realm,
        url,
      },
      true
    );
  });

  it("Returns a mocked client when running locally", async () => {
    expect(sdk).toBeInstanceOf(TdSdk);
  });

  it("Creates an episode", async () => {
    expect(await sdk.createEpisode("id")).toBeInstanceOf(Episode);
  });
});
