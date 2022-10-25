import TdSdk from ".";

const applicationId = "talentApplicationProfileTwo";

export class Episode {
  private constructor(id: string, private sdk: TdSdk) {
    this.id = id;
  }
  id: string;

  static async create(id: string, sdk: TdSdk) {
    // Get the epiode payload
    return new Episode(id, sdk);
  }

  start = () => {};

  end = async (navigateToDashboard = true) => {
    const events = [
      {
        eventTypeId: "episode.end",
        season: "95",
        episode: this.id,
      },
    ];

    if (navigateToDashboard) {
      return this.sdk
        .request("1/event/profile2", "post", {
          json: { applicationId, events },
        })
        .then(() => {
          this.sdk.navigateToDashboard();
        });
    } else {
      return this.sdk.request("1/event/profile2", "post", {
        json: { applicationId, events },
      });
    }
  };

  test = (testId: string, value: 0 | 1) => {
    const events = [
      { type: "test.complete", result: { id: `${this.id}.${testId}`, value } },
    ];

    return this.sdk.request("1/event/profile2", "post", {
      json: { applicationId, events },
      retry: {
        limit: 3,
      },
    });
  };
}
